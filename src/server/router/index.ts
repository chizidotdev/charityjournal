// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { commentRouter } from './comment';
import { postRouter } from './post';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('post.', postRouter)
  .merge('comment.', commentRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
