// src/pages/_app.tsx
import '../styles/main.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { withTRPC } from '@trpc/next';
import type { AppRouter } from '../server/router';
import type { AppType } from 'next/dist/shared/lib/utils';
import superjson from 'superjson';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Head from 'next/head';

const MyApp: AppType = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <title>Charity Journal | Telling the story of good deeds</title>
          <meta name='description' content='Charity Journal | Telling the story of good deeds' />
          <link rel='icon' href='/logob-sec.png' />
        </Head>

        <div className='sticky top-0 z-10'>
          <Navbar />
        </div>

        <Component {...pageProps} />
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
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

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
  ssr: false,
})(MyApp);
