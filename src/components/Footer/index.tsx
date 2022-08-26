import { Input } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className='bg-pri text-white'>
      <div className='container pt-16 pb-20 lg:pt-20 lg:pb-24 flex flex-col md:flex-row gap-16 md:gap-10'>
        <div className='max-w-[500px] md:w-1/3 flex flex-col gap-5'>
          <Link href='/'>
            <div className='w-36 h-10 relative'>
              <Image alt='' src='/logob-white.png' layout='fill' priority />
            </div>
          </Link>

          <p className='caption-sm'>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </p>

          <p className='text-xs'>&copy; Charity Journal 2022. All rights reserved.</p>
        </div>

        <div className='max-w-[500px] md:w-1/3 flex flex-col gap-5 lg:gap-7'>
          <div className='uppercase heading-4'>Contact us</div>

          <div className='caption-sm flex flex-col gap-1 lg:gap-3'>
            <p className='link-white w-max caption-sm'>info@charityjournal.com</p>
            <p>1437 Rollins Road, Wellfleet. Nebraska.</p>
            <p>308-963-5861</p>
          </div>

          <div className='uppercase heading-4'>Careers</div>
        </div>

        <div className='max-w-[500px] md:w-1/3 flex flex-col gap-3'>
          <div className='uppercase heading-4'>Subscribe now</div>

          <p className='caption-sm'>
            Sign up to get email notifications on the latest charity news.
          </p>

          <div className='mt-3'>
            <Input
              _focusVisible={{}}
              _focus={{ borderColor: '#fff', boxShadow: '0 0 0 1px #1db3a6' }}
            />
            <button className='btn-pri mt-2 px-8'>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
