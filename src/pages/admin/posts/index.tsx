import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
} from '@chakra-ui/react';
import { Post } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/UI/AdminLayout';
import Modal from '../../../components/UI/Modal';
import { trpc } from '../../../utils/trpc';

interface PostTypeProps {
  name: string;
}

const Posts = () => {
  useSession({ required: true });

  const { data, isLoading, isError } = trpc.useQuery(['post.getAllPosts'], {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isError) toast('Error loading posts... Please refresh.', { type: 'error' });

  let posts: JSX.Element = <div></div>;

  if (isLoading) {
    posts = <p>Loading...</p>;
  }

  if (data) {
    posts = (
      <>
        {data.length === 0 ? (
          <p>No posts found...</p>
        ) : (
          <>
            <TableContainer>
              <Table variant='simple'>
                <TableCaption>Post information table</TableCaption>
                <Thead>
                  <Tr>
                    <Th isNumeric>id</Th>
                    <Th>title</Th>
                    <Th>created_at</Th>
                    <Th>updated_at</Th>
                    <Th>status</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                {data.map((post) => (
                  <PostItem key={post.id} post={post} />
                ))}
              </Table>
            </TableContainer>
          </>
        )}
      </>
    );
  }

  return (
    <AdminLayout pageTitle='Posts'>
      <div className='lg:py-5 sm:px-5 lg:px-0'>
        {/* <section className='flex gap-5'>
          <PostType name='All Posts' />
          <PostType name='Pending' />
        </section> */}

        <section className='flex flex-col gap-3 md:gap-5 py-5 md:py-7'>{posts}</section>
      </div>
    </AdminLayout>
  );
};

const PostType = ({ name }: PostTypeProps) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`cursor-pointer px-5 lg:px-7 py-2 text-sm
      ${active ? 'text-black font-bold underline underline-offset-4' : 'text-gray-500'}`}
      onClick={() => setActive((prev) => !prev)}
      // onClick={() => setActive(true)}
    >
      {name}
    </div>
  );
};

interface PostItemProps {
  post: Post;
}

const PostItem = ({ post }: PostItemProps) => {
  const deletePost = trpc.useMutation(['protected.deletePost']);
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    deletePost.mutate(
      { postId: post.id },
      {
        onSuccess: () => {
          toast('User deleted successfully', { type: 'success' });
        },
        onError: (error) => {
          toast(error.message, { type: 'error' });
        },
      }
    );
  };

  return (
    <Tbody fontSize={'sm'}>
      <Modal
        title='Delete Post'
        description='Are you sure you want to delete this post?'
        callback={handleDelete}
        open={open}
        setOpen={setOpen}
      />
      <Tr>
        <Td isNumeric>{post.id}.</Td>
        <Td>
          <Link href='/admin/posts/[id]' as={`/admin/posts/${post.id}`}>
            <h2 className='cursor-pointer max-w-xs truncate hover:underline'>{post.title}</h2>
          </Link>
        </Td>
        <Td>
          {post.createdAt.toDateString()}, {post.createdAt.toLocaleTimeString()}
        </Td>
        <Td>
          {post.updatedAt.toDateString()}, {post.updatedAt.toLocaleTimeString()}
        </Td>
        <Td>{post.published ? <Text>Published</Text> : <Text>Not Published</Text>}</Td>
        <Td className='flex gap-3'>
          <Link href='/admin/posts/edit/[id]' as={`/admin/posts/edit/${post.id}`}>
            <div className='cursor-pointer hover:text-[#1db3a6]'>
              <EditIcon />
            </div>
          </Link>

          <div onClick={() => setOpen(true)} className='cursor-pointer hover:text-[#1db3a6]'>
            <DeleteIcon />
          </div>
        </Td>
      </Tr>
    </Tbody>
  );
};

export default Posts;
