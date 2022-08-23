import { Divider } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface TrendingProps {
  title: string;
}

const Trending: React.FC<TrendingProps> = ({ title }) => {
  return (
    <div className=''>
      <div>
        <Divider borderColor='#d5d5d5' />
        <div className='flex items-center justify-between py-5'>
          <h1 className='heading-2 uppercase'>{title}</h1>
          <div className='link'>
            <Link href='/'>View all</Link>
          </div>
        </div>
        <Divider borderColor='#d5d5d5' />
      </div>

      <Content />
      <Content />
    </div>
  );
};

const Content = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between gap-6 lg:gap-10 pt-5 lg:pt-10'>
      <div className='relative self-center w-full md:w-2/6 h-56 rounded-md overflow-hidden'>
        <Image src='/unsplash.png' alt='' layout='fill' objectFit='cover' />
      </div>

      <div className='w-full md:w-3/5 md:h-56 flex flex-col gap-2 pb-5'>
        <div className='flex items-center justify-between gap-6'>
          <div className='flex items-center gap-5'>
            <Divider width={10} borderColor='#d5d5d5' />
            <span className='uppercase opacity-50 text-xs'>by John Doe</span>
          </div>

          <span className='md:hidden md:mt-4 text-xs opacity-50 flex items-center gap-2'>
            <span>Aug 15</span>
            <Divider width={3} borderColor='#373435' />
            <span>5 min read</span>
          </span>
        </div>

        <h1 className='heading-2-sm'>
          Lorem ipsum dolor sit amet, con adipiscing elit, sed do eiusmod
        </h1>

        <p className='caption-sm'>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </p>

        <span className='hidden md:mt-4 text-xs opacity-50 md:flex items-center gap-2'>
          <span>Aug 15</span>
          <Divider width={3} borderColor='#373435' />
          <span>5 min read</span>
        </span>
      </div>
    </div>
  );
};

export default Trending;
