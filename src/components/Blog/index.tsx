import { Divider } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface TrendingProps {
  title: string;
  nolink?: boolean;
  layout: 'horizontal' | 'normal';
}

interface ContentProps {
  image?: string;
  nolink?: boolean;
  layout: 'horizontal' | 'normal';
}

const Trending: React.FC<TrendingProps> = ({ title, nolink, layout }) => {
  return (
    <div className=''>
      <div>
        <Divider borderColor='#d5d5d5' />
        <div className='flex items-center justify-between py-5'>
          <h1 className='heading-2 uppercase'>{title}</h1>
          <div className='link'>{!nolink && <Link href='/blog'>View all</Link>}</div>
        </div>
        <Divider borderColor='#d5d5d5' />
      </div>

      <Content
        layout={layout}
        image={`https://picsum.photos/id/${Math.round(Math.random() * 900)}/300/200/`}
        // image={'/unsplash.png'}
      />
      <Content
        layout={layout}
        image={`https://picsum.photos/id/${Math.round(Math.random() * 900)}/300/200/`}
        // image={'/unsplash.png'}
      />
    </div>
  );
};

export const Content: React.FC<ContentProps> = ({ image, layout }) => {
  if (layout === 'horizontal') {
    return (
      <div className='flex md:flex-row justify-between gap-3 md:gap-6 lg:gap-10 pt-10 lg:pt-10'>
        <div className='relative self-center w-2/6 h-24 md:w-2/6 md:h-56 rounded-md overflow-hidden'>
          <Image
            src={image ? image : 'https://picsum.photos/300/200'}
            alt=''
            layout='fill'
            objectFit='cover'
            className='blog-img'
          />
        </div>

        <div className='w-3/4 md:w-3/5 md:h-56 flex flex-col gap-2 md:pb-5'>
          <h1 className='heading-2-sm'>
            Lorem ipsum dolor sit amet, con adipiscing elit, sed do eiusmod
          </h1>

          <p className='hidden md:block caption-sm'>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur.
          </p>

          <span className='md:mt-4 text-xs opacity-50 flex items-center gap-2'>
            <span>Aug 15</span>
            <Divider width={3} borderColor='#373435' />
            <span>5 min read</span>
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div className='flex flex-col md:flex-row justify-between gap-6 lg:gap-10 pt-10 lg:pt-10'>
        <div className='relative self-center w-full md:w-2/6 h-56 rounded-md overflow-hidden'>
          <Image
            src={image ? image : 'https://picsum.photos/300/200'}
            alt=''
            layout='fill'
            objectFit='cover'
            className='blog-img'
          />
        </div>

        <div className='w-full md:w-3/5 md:h-56 flex flex-col gap-2 pb-5'>
          <div className='flex items-center justify-between gap-6'>
            <span className='md:hidden md:mt-4 text-xs opacity-50 flex items-center gap-2'>
              <span>Aug 15</span>
              <Divider width={3} borderColor='#373435' />
              <span>5 min read</span>
            </span>

            {/* <div className='flex items-center gap-5'>
              <Divider width={10} borderColor='#d5d5d5' />
              <span className='uppercase opacity-50 text-xs'>by John Doe</span>
            </div> */}
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
  }
};

export default Trending;
