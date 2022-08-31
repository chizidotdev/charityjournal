import { Button, Checkbox, Input, Textarea } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Editor from '../../../../components/Draft';
import AdminLayout from '../../../../components/UI/AdminLayout';
import { trpc } from '../../../../utils/trpc';

interface FormValues {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  published: boolean;
  authorId: string;
}

const EditPost = () => {
  const [content, setContent] = useState('');
  const router = useRouter();

  console.log('router====', router.query);

  const { data: session } = useSession();
  const { register, handleSubmit } = useForm<FormValues>();

  const editPost = trpc.useMutation(['post.updatePost']);
  const getPost = trpc.useQuery(['post.getPost', { id: router.query.id as unknown as number }]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!session) {
      return alert('You must be logged in to create a post');
    }

    const input: FormValues = {
      id: router.query.id as unknown as number,
      title: data.title,
      published: data.published,
      excerpt: data.excerpt,
      content,
      authorId: session.id as string,
    };

    console.log('input====', input);

    // editPost.mutate(input);
  };

  return (
    <AdminLayout pageTitle='Edit Post'>
      <div className='container py-5'>
        <section className='max-w-3xl'>
          <div className='py-5 flex flex-col gap-10'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
              <label>
                Title:
                <Input
                  defaultValue={getPost.data?.title || ''}
                  {...register('title', { required: true })}
                />
              </label>

              <label>
                Excerpt:
                <Textarea
                  defaultValue={getPost.data?.excerpt || ''}
                  {...register('excerpt', { required: true })}
                />
              </label>

              <label>
                Content:
                <Editor content={getPost.data?.content} setContent={setContent} editing />
              </label>

              <div className='flex flex-col-reverse gap-5 md:flex-row justify-between'>
                <label className='flex items-center gap-5'>
                  Publish:
                  <Checkbox {...register('published')} size={'lg'} borderColor={'#5f5e5e'} />
                </label>

                <label>
                  Cover Photo:
                  <Input type='file' placeholder='Select Image' border={'none'} padding={'none'} />
                </label>
              </div>

              <Button type='submit' my={5} className='w-32'>
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
