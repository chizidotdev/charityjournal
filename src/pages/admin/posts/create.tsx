import { Button, Checkbox, Input, Textarea } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Editor from '../../../components/Draft';
import AdminLayout from '../../../components/UI/AdminLayout';
import { requireAuth } from '../../../utils/requireAuth';
import { trpc } from '../../../utils/trpc';

interface FormValues {
  title: string;
  content: string;
  excerpt: string;
  published: boolean;
  authorId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return requireAuth(context, (session) => {
    return { props: { session } };
  });
};

const CreatePost = () => {
  const [content, setContent] = useState('');

  const createPost = trpc.useMutation(['protected.createPost']);
  const { data: session } = useSession();
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!session) {
      return alert('You must be logged in to create a post');
    }

    const input: FormValues = {
      title: data.title,
      published: data.published,
      excerpt: data.excerpt,
      content,
      authorId: session.id as string,
    };

    console.log('input====', input);

    createPost.mutate(input);
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

              <div className='flex flex-col-reverse gap-5 md:flex-row justify-between'>
                <label className='flex items-center gap-5'>
                  Publish:
                  <Checkbox {...register('published')} size={'lg'} borderColor={'#5f5e5e'} />
                </label>

                <label>
                  Cover Photo:
                  <Input
                    type='file'
                    placeholder='Select Image'
                    border={'none'}
                    padding={'none'}
                    // {...register('image')}
                  />
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

export default CreatePost;
