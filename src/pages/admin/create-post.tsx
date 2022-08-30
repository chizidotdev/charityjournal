import { Button, Checkbox, Input, Textarea } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Editor from '../../components/Draft';
import { trpc } from '../../utils/trpc';

interface FormValues {
  title: string;
  content: string;
  excerpt: string;
  published: boolean;
  authorId: string;
}

const CreatePost = () => {
  const [content, setContent] = useState('');

  const createPost = trpc.useMutation(['post.createPost']);
  const { data: session } = useSession();
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (!session) {
      return alert('You must be logged in to create a post');
    }

    console.log('data====', data);

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
    <div className='container py-5'>
      <section className='max-w-3xl mx-auto'>
        <h1 className='heading-1 no-underline'>Write New Post</h1>

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
              Publish:
              <Checkbox {...register('published')} />
            </label>

            <Button type='submit' my={5} className='w-32'>
              Submit
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreatePost;
