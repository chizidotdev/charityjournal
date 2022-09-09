import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

import { Button, Checkbox, Input, Textarea } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Editor from '../../../components/Draft';
import AdminLayout from '../../../components/UI/AdminLayout';

import { trpc } from '../../../utils/trpc';
import getImageUrl from '../../../utils/getImageUrl';
import { useRouter } from 'next/router';

interface FormValues {
  title: string;
  content: string;
  excerpt: string;
  published: boolean;
  featured: boolean;
  authorId: string;
  image: string;
}

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | undefined>();
  const [loading, setLoading] = useState(false);

  const createPost = trpc.useMutation(['protected.createPost']);
  // const user = trpc.useQuery(['user.getUser', {email: session.email}]);
  const { data: session } = useSession({ required: true });

  const { register, handleSubmit } = useForm<FormValues>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!session) {
      return toast.error('You must be logged in to create a post', { type: 'warning' });
    }

    if (!image) {
      return toast('Upload a cover image', { type: 'warning' });
    }

    setLoading(true);
    const imageUrl = await getImageUrl(image);

    const input: FormValues = {
      title: data.title,
      published: data.published,
      featured: data.featured,
      excerpt: data.excerpt,
      content,
      image: imageUrl,
      authorId: session.id as string,
    };

    createPost.mutate(input, {
      onSuccess: () => {
        toast('Post created successfully', { type: 'success' });
        router.push('/admin/posts');
      },
      onError: (error) => {
        toast(error.message, { type: 'error' });
      },
    });
    setLoading(false);
  };

  return (
    <AdminLayout pageTitle='Write New Post'>
      <div className='container py-5'>
        <section className='max-w-3xl'>
          <div className='py-5 flex flex-col gap-10'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
              {/* register your input into the hook by invoking the "register" function */}
              <label>
                Title:
                <Input {...register('title', { required: true })} />
              </label>

              <label>
                Excerpt:
                <Textarea {...register('excerpt', { required: true })} />
              </label>

              {/* include validation with required or other standard HTML validation rules */}
              <label>
                Content:
                {/* <Input {...register('content', { required: true })} /> */}
                <Editor setContent={setContent} />
              </label>

              <label>
                Cover Photo:
                <Input
                  required
                  type='file'
                  placeholder='Select Image'
                  border={'none'}
                  padding={'none'}
                  onChange={(e) => {
                    e.target.files && setImage(e.target.files[0]);
                  }}
                />
              </label>

              <div className='flex flex-col-reverse gap-10 md:flex-row'>
                <label className='flex items-center gap-3'>
                  Publish:
                  <Checkbox {...register('published')} size={'lg'} borderColor={'#5f5e5e'} />
                </label>

                <label className='flex items-center gap-3'>
                  Featured:
                  <Checkbox {...register('featured')} size={'lg'} borderColor={'#5f5e5e'} />
                </label>
              </div>

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

export default CreatePost;
