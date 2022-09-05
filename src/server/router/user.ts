import { z } from 'zod';
import { createProtectedRouter } from './protected-router';

export const userRouter = createProtectedRouter()
  .query('getUser', {
    input: z
      .object({
        email: z.string(),
      })
      .nullish(),
    resolve({ ctx, input }) {
      if (input) {
        return ctx.prisma.user.findFirst({
          where: {
            email: input.email,
          },
        });
      } else {
        return null;
      }
    },
  })
  .query('getAllUsers', {
    async resolve({ ctx }) {
      return await ctx.prisma.user.findMany();
    },
  });
