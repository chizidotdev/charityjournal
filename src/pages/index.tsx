import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Home: NextPage = () => {
  const hello = trpc.useQuery(['example.hello', { text: 'Chizi the dev' }]);

  // const question = trpc.useQuery(['question.getSession']);

  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Charity Journal</title>
        {/* <meta name='description' content='' /> */}
        {/* <link rel='icon' href='/favicon.ico' /> */}
      </Head>

      <main className='container mx-auto flex flex-col items-center justify-center min-h-screen p-4'>
        <div className='pt-6 text-2xl text-blue-500 flex justify-center items-center w-full'>
          {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
        </div>
        <div className='pt-6 text-2xl text-blue-500 flex justify-center items-center w-full'>
          {status === 'authenticated' ? (
            <p>Signed in as {session.user?.id}</p>
          ) : (
            <Link href='/api/auth/signin'>Sign in</Link>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
