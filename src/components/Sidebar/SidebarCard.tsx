import { Input } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

interface SidebarCardProps {
  title?: string;
  body?: string;
  link?: string;
}

export const SidebarCard: React.FC<SidebarCardProps> = ({}) => {
  return (
    <div className='sidebar_card w-full p-10 flex flex-col items-center justify-center gap-8 text-center'>
      <h1 className='heading-2-sm capitalize text-center'>Career Opportunities</h1>
      <p className='caption-sm'>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur.
      </p>
      <Link href='/'>
        <span className='link-white'>Learn More</span>
      </Link>
    </div>
  );
};

export const NewsletterCard: React.FC<SidebarCardProps> = ({}) => {
  return (
    <div className='sidebar_card w-full p-10 flex flex-col items-center justify-center gap-8 text-center'>
      <h1 className='heading-2-sm capitalize text-center'>subscribe to the newsletter</h1>
      <p className='caption-sm'>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <div>
        <Input
          _focusVisible={{}}
          _focus={{ borderColor: '#fff', boxShadow: '0 0 0 1px #1db3a6' }}
        />
        <button className='btn-pri mt-5'>Subscribe</button>
      </div>
    </div>
  );
};
