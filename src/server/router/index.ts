// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { postRouter, protectedPostRouter } from './post';
import { userRouter } from './user';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('user.', userRouter)
  .merge('post.', postRouter)
  .merge('protected.', protectedPostRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
