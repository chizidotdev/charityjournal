import { createRouter } from './context';
import { z } from 'zod';

export const commentRouter = createRouter()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? 'world'}`,
      };
    },
  })
  .query('getAllComments', {
    async resolve({ ctx }) {
      return await ctx.prisma.user.findMany();
    },
  })
  .query('getAllUsers', {
    async resolve({ ctx }) {
      return await ctx.prisma.user.findMany();
    },
  });
