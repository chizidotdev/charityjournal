import { Button, Checkbox, Input, Textarea } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Editor from '../../../../components/Draft';
import AdminLayout from '../../../../components/UI/AdminLayout';
import { trpc } from '../../../../utils/trpc';
import getImageUrl from '../../../../utils/getImageUrl';
import { toast } from 'react-toastify';

interface FormValues {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  featured: boolean;
  published: boolean;
  authorId: string;
}

const EditPost = () => {
  useSession({ required: true });
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | undefined>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const editPost = trpc.useMutation(['protected.updatePost']);
  const getPost = trpc.useQuery(['post.getPost', { id: Number(router.query.id) }], {
    refetchOnWindowFocus: false,
  });

  const { data: session } = useSession();
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      id: Number(router.query.id),
      title: getPost.data?.title,
      excerpt: getPost.data?.excerpt,
      content: getPost.data?.content,
      published: getPost.data?.published,
      featured: getPost.data?.featured,
      authorId: '',
    },
  });

  if (getPost.status === 'error') {
    return (
      <AdminLayout pageTitle='Error'>
        <div className='container'>Error fetching post</div>
      </AdminLayout>
    );
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!session) {
      return alert('You must be logged in to create a post');
    }
    setLoading(true);

    let input: FormValues = {
      id: Number(router.query.id),
      title: data.title,
      published: data.published,
      featured: data.featured,
      excerpt: data.excerpt,
      content,
      image: getPost?.data?.image || '',
      authorId: session.id as string,
    };

    if (image) {
      const imageUrl = await getImageUrl(image);

      input = {
        ...input,
        image: imageUrl,
      };
    }

    editPost.mutate(input, {
      onSuccess: () => {
        toast(`Post edited successfully`, { type: 'success' });
        router.push('/admin/posts');
      },
      onError: (error) => {
        toast(error.message, { type: 'error' });
      },
    });
    setLoading(false);
  };

  return (
    <AdminLayout pageTitle='Edit Post'>
      <div className='container py-5'>
        <section className='max-w-3xl'>
          <div className='py-5 flex flex-col gap-10'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
              <label>
                Title:
                <Input defaultValue={getPost.data?.title || ''} {...register('title')} />
              </label>

              <label>
                Excerpt:
                <Textarea defaultValue={getPost.data?.excerpt || ''} {...register('excerpt')} />
              </label>

              <label>
                Content:
                <Editor content={getPost.data?.content} setContent={setContent} editing />
              </label>

              <div className='flex flex-col-reverse gap-3 md:flex-row'>
                <label className='flex items-center gap-5'>
                  Publish:
                  <Checkbox
                    checked={getPost.data?.published}
                    {...register('published')}
                    size={'lg'}
                    borderColor={'#5f5e5e'}
                  />
                </label>

                <label className='flex items-center gap-3'>
                  Featured:
                  <Checkbox
                    checked={getPost.data?.featured}
                    {...register('featured')}
                    size={'lg'}
                    borderColor={'#5f5e5e'}
                  />
                </label>
              </div>

              <label>
                Cover Photo:
                <Input
                  type='file'
                  placeholder='Select Image'
                  border={'none'}
                  padding={'none'}
                  onChange={(e) => {
                    e.target.files && setImage(e.target.files[0]);
                  }}
                />
              </label>

              <Button type='submit' my={5} className='w-32' isLoading={loading}>
                Submit
              </Button>
            </form>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default EditPost;
