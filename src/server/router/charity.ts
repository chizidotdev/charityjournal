import { createRouter } from './context';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const defaultPostSelect = Prisma.validator<Prisma.CharitySelect>()({
  id: true,
  name: true,
  website: true,
  about: true,
  location: true,
  rating: true,
  careers: true,
  createdAt: true,
  updatedAt: true,
});

export const charityRouter = createRouter()
  .query('getCharityOrgs', {
    async resolve({ ctx }) {
      return await ctx.prisma.charity.findMany({
        orderBy: {
          id: 'desc',
        },
      });
    },
  })
  .query('getCharity', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.charity.findUnique({
        where: { id: input.id },
      });
    },
  })
  .query('findCharity', {
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
