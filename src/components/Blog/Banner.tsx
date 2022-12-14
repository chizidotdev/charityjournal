import { Center, Divider } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

interface TrendingProps {
  title: string;
}

const Banner: React.FC<TrendingProps> = ({ title }) => {
  return (
    <>
      <div>
        {/* <Divider borderColor='#d5d5d5' /> */}
        <div className='flex items-center justify-between pb-3'>
          <h1 className='heading-2 heading-animate uppercase'>{title}</h1>
          <div className='link'>{/* <Link href='/'>View all</Link> */}</div>
        </div>
        {/* <Divider borderColor='#d5d5d5' /> */}
      </div>

      <div className='flex flex-col lg:flex-row md:gap-8 pt-5 md:pt-10'>
        <div className='lg:w-3/4'>
          <Content />
        </div>

        <Center height='full' display={{ base: 'none', lg: 'flex' }}>
          <Divider orientation='vertical' borderColor={'#000'} />
        </Center>

        <div className='mt-5 md:mt-0 md:flex gap-10 lg:block lg:w-2/5'>
          <SmallContent />
          <SmallContent />
        </div>
      </div>
    </>
  );
};

export default Banner;

const Content = () => {
  return (
    <div className='flex flex-col justify-between gap-6'>
      <div className='relative self-center w-full h-60 md:h-96 rounded-md overflow-hidden'>
        <Image
          src={`https://picsum.photos/id/${Math.round(Math.random() * 900)}/300/200/`}
          alt=''
          layout='fill'
          objectFit='cover'
          className='image-animate'
        />
      </div>

      <div className='w-full flex flex-col gap-2 pb-5'>
        <div className='flex items-center justify-between md:mb-4'>
          <div className='text-xs opacity-50 flex items-center gap-2'>
            <span>Aug 15</span>
            <Divider width={3} borderColor='#373435' />
            <span>5 min read</span>
          </div>
          <div className='flex items-center gap-5'>
            <Divider width={10} borderColor='#d5d5d5' />
            <span className='uppercase opacity-50 text-xs'>by John Doe</span>
          </div>
        </div>

        <h1 className='heading-2 heading-animate'>
          Lorem ipsum dolor sit amet, con adipiscing elit, sed do eiusmod
        </h1>

        <p className='caption'>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </p>
      </div>
    </div>
  );
};

export const SmallContent = () => {
  return (
    <div className='flex flex-col justify-between gap-6 lg:gap-6 mb-4'>
      <div className='relative self-center w-full h-60 lg:h-36 rounded-md overflow-hidden'>
        <Image
          src={`https://picsum.photos/id/${Math.round(Math.random() * 900)}/300/200/`}
          alt=''
          layout='fill'
          objectFit='cover'
          className='image-animate'
        />
      </div>

      <div className='w-full flex flex-col gap-2 pb-5'>
        <div className='flex items-center justify-between gap-6'>
          <div className='text-xs opacity-50 flex items-center gap-2'>
            <span>Aug 15</span>
            <Divider width={3} borderColor='#373435' />
            <span>5 min read</span>
          </div>

          <div className='flex items-center gap-5'>
            <Divider width={10} borderColor='#d5d5d5' />
            <span className='uppercase opacity-50 text-xs'>by John Doe</span>
          </div>
        </div>

        <h1 className='heading-2-sm heading-animate'>
          Lorem ipsum dolor sit amet, con adipiscing elit, sed do eiusmod
        </h1>

        <p className='caption-sm'>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </div>
    </div>
  );
};
