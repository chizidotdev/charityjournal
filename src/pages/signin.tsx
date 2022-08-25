import {
  ClientSafeProvider,
  getProviders,
  getSession,
  LiteralUnion,
  signIn,
} from 'next-auth/react';
import React from 'react';

import { NextPage } from 'next';
import { BuiltInProviderType } from 'next-auth/providers';
// import Link from 'next/link';

interface Props {
  session: undefined;
  providers?: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
}

const SignIn: NextPage<Props> = () => {
  const handleSubmit = (e: HTMLFormElement) => {
    e.preventDefault();
    // signIn('credentials', )

    console.log(e.target);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // signIn('credentials', )

          console.log(e.target);
        }}
        className='bg-gray-200 dark:bg-gray-900 flex items-center justify-center'
        style={{ fontFamily: '"Lato", sans-serif' }}
      >
        <div className='flex md:flex-row flex-col items-center py-8 px-4'>
          <div className='flex flex-col md:mr-16'>
            <label
              htmlFor='email'
              className='text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2'
            >
              Email
            </label>
            <input
              id='email'
              className='text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow'
              placeholder='Placeholder'
            />
          </div>

          <div className='flex flex-col md:py-0 py-4'>
            <label
              htmlFor='email1'
              className='md:pt-4 text-gray-400 text-sm font-bold leading-tight tracking-normal mb-2'
            />
            <input
              id='email1'
              className='text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow'
              placeholder='example@example.com'
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

SignIn.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
    return {
      session: undefined,
      providers: null,
    };
  }
  return {
    session: undefined,
    providers: await getProviders(),
  };
};
