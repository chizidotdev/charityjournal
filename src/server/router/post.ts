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
  .query('getPost', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.post.findUnique({
        where: { id: input.id },
      });
    },
  })
  .query('findPost', {
    input: z.object({
      query: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.post.findMany({
        where: {
          title: {
            search: input.query,
          },
        },
      });
    },
  })
  .mutation('createPost', {
    input: z.object({
      title: z.string(),
      excerpt: z.string(),
      content: z.string(),
      authorId: z.string(),
      published: z.boolean(),
    }),
    async resolve({ input, ctx }) {
      const post = await ctx.prisma.post.create({
        data: input,
        select: defaultPostSelect,
      });
      return post;
    },
  })
  .mutation('updatePost', {
    input: z.object({
      id: z.number(),
      title: z.string(),
      excerpt: z.string(),
      content: z.string(),
      authorId: z.string(),
      published: z.boolean(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.post.update({
        where: {
          id: input.id,
        },
        data: input,
        select: defaultPostSelect,
      });
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
