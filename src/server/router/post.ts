import { createRouter } from './context';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { createProtectedRouter } from './protected-router';

export const defaultPostSelect = Prisma.validator<Prisma.PostSelect>()({
  id: true,
  title: true,
  content: true,
  image: true,
  featured: true,
  published: true,
  author: true,
  authorId: true,
  createdAt: true,
  updatedAt: true,
});

export const postRouter = createRouter()
  .query('getAllPosts', {
    async resolve({ ctx }) {
      return await ctx.prisma.post.findMany({
        orderBy: {
          id: 'desc',
        },
      });
    },
  })
  .query('getFeaturedPublishedPosts', {
    async resolve({ ctx }) {
      return await ctx.prisma.post.findMany({
        where: {
          featured: true,
          published: true,
        },
        orderBy: {
          id: 'desc',
        },
      });
    },
  })
  .query('getPublishedPosts', {
    async resolve({ ctx }) {
      return await ctx.prisma.post.findMany({
        where: {
          published: true,
        },
        orderBy: {
          id: 'desc',
        },
      });
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
  });

export const protectedPostRouter = createProtectedRouter()
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
  })
  .mutation('updatePost', {
    input: z.object({
      id: z.number(),
      title: z.string(),
      excerpt: z.string(),
      image: z.string(),
      content: z.string(),
      authorId: z.string(),
      published: z.boolean(),
      featured: z.boolean(),
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
  .mutation('updateFeatured', {
    input: z.object({
      id: z.number(),
      featured: z.boolean(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.post.update({
        where: {
          id: input.id,
        },
        data: {
          featured: input.featured,
        },
      });
    },
  })
  .mutation('createPost', {
    input: z.object({
      title: z.string(),
      excerpt: z.string(),
      image: z.string(),
      content: z.string(),
      authorId: z.string(),
      published: z.boolean(),
      featured: z.boolean(),
    }),
    async resolve({ input, ctx }) {
      console.log('input====', input);

      const post = await ctx.prisma.post.create({
        data: input,
        select: defaultPostSelect,
      });
      return post;
    },
  });
