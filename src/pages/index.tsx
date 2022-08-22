import type { NextPage } from 'next';
// import { trpc } from '../utils/trpc';
// import { signIn, signOut, useSession } from 'next-auth/react';

const Home: NextPage = () => {
  // const posts = trpc.useQuery(['post.getAllPosts']);
  // const deletePost = trpc.useMutation(['post.deletePost']);
  // const { data: session } = useSession();

  return <div className='w-full'></div>;
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
