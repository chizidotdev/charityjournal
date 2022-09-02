import { Post } from '@prisma/client';
import React, { createContext } from 'react';
import { toast } from 'react-toastify';
import { trpc } from '../utils/trpc';

interface PostContextProps {
  posts: Post[] | undefined;
  isLoading: boolean;
}

const PostCtx = createContext<PostContextProps>({
  posts: undefined,
  isLoading: true,
});

export default PostCtx;

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError } = trpc.useQuery(['post.getAllPosts'], {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isError) toast('Error loading posts... Please refresh.', { type: 'error' });

  return <PostCtx.Provider value={{ posts: data, isLoading }}>{children}</PostCtx.Provider>;
};
