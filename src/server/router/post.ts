import { createRouter } from './context';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const defaultPostSelect = Prisma.validator<Prisma.PostSelect>()({
  id: true,
  title: true,
  content: true,
  published: true,
  author: true,
  authorId: true,
  createdAt: true,
  updatedAt: true,
});

export const postRouter = createRouter()
  .query('getAllPosts', {
    async resolve({ ctx }) {
      return await ctx.prisma.post.findMany();
    },
  })
  .mutation('createPost', {
    input: z.object({
      title: z.string(),
      content: z.string(),
      authorId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const post = await ctx.prisma.post.create({
        data: input,
        select: defaultPostSelect,
      });
      return post;
    },
  })
  .mutation('deletePost', {
    input: z.object({
      postId: z.number(),
    }),
    async resolve({ input, ctx }) {
      await ctx.prisma.post.delete({
        where: { id: input.postId },
      });

      return 'success';
    },
  });
