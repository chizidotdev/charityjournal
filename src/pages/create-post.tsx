import { Button, Input } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { unstable_getServerSession } from 'next-auth/next';
// import { authOptions } from './api/auth/[...nextauth]';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { trpc } from '../utils/trpc';
// import { GetServerSideProps } from 'next';

type FormData = {
  title: string;
  content: string;
};

export default function CreatePost() {
  const createPost = trpc.useMutation(['post.createPost']);
  const { register, handleSubmit } = useForm<FormData>();
  const { data: session } = useSession();

  const router = useRouter();

  // console.log('authOptions', JSON.parse(JSON.stringify(authOptions)));

  if (typeof window === 'undefined') return null;

  if (session) {
    const onSubmit: SubmitHandler<FormData> = (data) => {
      const input = {
        ...data,
        authorId: session.id as string,
      };

      createPost.mutate(input);
    };

    return (
      <div>
        <Link href='/'>
          <Button mb={10}>Home Page</Button>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
          {/* register your input into the hook by invoking the "register" function */}
          <label>
            Title:
            <Input {...register('title')} />
          </label>

          {/* include validation with required or other standard HTML validation rules */}
          <label>
            Content:
            <Input {...register('content', { required: true })} />
          </label>

          <Button type='submit' my={5}>
            Submit
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Button onClick={() => router.push('/api/login')}>Log in</Button> to create post
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return {
//     props: {
//       session: await unstable_getServerSession(
//         context.req,
//         context.res,
//         // authOptions
//         JSON.parse(JSON.stringify(authOptions))
//       ),
//     },
//   };
// };
