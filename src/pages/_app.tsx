// src/pages/_app.tsx
import '../styles/main.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-toastify/dist/ReactToastify.css';
import { withTRPC } from '@trpc/next';
import type { AppRouter } from '../server/router';
import type { AppType } from 'next/dist/shared/lib/utils';
import superjson from 'superjson';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { PostProvider } from '../context/post-context';

const MyApp: AppType = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <PostProvider>
          <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            <title>Charity Journal | Telling the story of good deeds</title>
            <meta name='description' content='Charity Journal | Telling the story of good deeds' />
            <link rel='icon' href='/logob-sec.png' />
          </Head>

          <Component {...pageProps} />
          <ToastContainer />
        </PostProvider>
      </SessionProvider>
    </ChakraProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== undefined) return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    const ONE_DAY_SECONDS = 60 * 60 * 24;
    ctx?.res?.setHeader('Cache-Control', `s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`);

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
