import type { NextPage } from 'next';
import Image from 'next/image';
// import { trpc } from '../utils/trpc';
// import { signIn, signOut, useSession } from 'next-auth/react';

const Home: NextPage = () => {
  // const posts = trpc.useQuery(['post.getAllPosts']);
  // const deletePost = trpc.useMutation(['post.deletePost']);
  // const { data: session } = useSession();

  return (
    <div className='container my-10'>
      <section className='flex gap-5'>
        <div className='flex charity-month'>
          <div className='w-3/5 min-w-[280px]'>
            <h1 className='heading-1 mb-5'>Charity Of The Month</h1>
            <p className='caption'>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
          </div>
          <div className='w-1/5'>
            {/* <Image src='/unsplash.png' width={600} height={400} alt='' /> */}
          </div>
        </div>

        <div className='flex gap-5'>
          <div className='feature-card hidden xl:flex flex-col w-64 min-w-[256px]'>
            <div className='h-2/5'>
              <Image src='/unsplash-1.png' width={500} height={300} alt='' />
            </div>
            <div className='p-5 bg-slate-50'>
              <h1 className='heading-2-sm mb-1'>Lorem Ipsum Dolor</h1>
              <p className='caption'>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
            </div>
          </div>
          <div className='feature-card hidden lg:flex flex-col w-64 min-w-[256px]'>
            <div className='h-2/5'>
              <Image src='/unsplash-1.png' width={500} height={300} alt='' />
            </div>
            <div className='p-5 bg-slate-50'>
              <h1 className='heading-2-sm mb-1'>Lorem Ipsum Dolor</h1>
              <p className='caption'>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

// Signed in as {session.user?.name} 🤭 ❤

// return (
//   <>
//     {session ? (
//       <Button onClick={() => signOut()}>Sign out</Button>
//     ) : (
//       <Button onClick={() => signIn()}>Sign in</Button>
//     )}

//     <div className='my-10'>
//       {posts.isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         posts.data?.map((post) => (
//           <div key={post.id} className='mb-5'>
//             <Flex justifyContent='space-between'>
//               <p>{post.title}</p>
//               <Button onClick={() => deletePost.mutate({ postId: post.id })}>&times;</Button>
//             </Flex>
//             <li>{post.content}</li>
//           </div>
//         ))
//       )}
//     </div>
//     <Link href='/create-post'>
//       <Button>Create Post</Button>
//     </Link>
//   </>
// );
