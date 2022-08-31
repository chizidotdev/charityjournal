import Link from 'next/link';
import React, { useState } from 'react';
import AdminLayout from '../../../components/UI/AdminLayout';

interface PostTypeProps {
  name: string;
}

const Posts = () => {
  return (
    <AdminLayout pageTitle='Posts'>
      <div className='lg:py-5 sm:px-5 lg:px-0'>
        <section className='flex gap-5'>
          <PostType name='All Posts' />
          <PostType name='Published' />
          <PostType name='Pending' />
        </section>

        <section className='flex flex-col gap-3 md:gap-5 py-5 md:py-7'>
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
        </section>
      </div>
    </AdminLayout>
  );
};

const PostType = ({ name }: PostTypeProps) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`cursor-pointer px-5 lg:px-7 py-2 text-sm
      ${active ? 'text-black font-bold underline underline-offset-4' : 'text-gray-500'}`}
      onClick={() => setActive((prev) => !prev)}
      // onClick={() => setActive(true)}
    >
      {name}
    </div>
  );
};

const PostItem = () => {
  return (
    <div className='flex gap-5 w-full'>
      <span>#01</span>

      <div className='w-4/5 lg:w-3/4'>
        <Link href='/admin/posts/edit/[id]' as={`/admin/posts/edit/${3}`}>
          <h1 className='heading-4 cursor-pointer'>
            Lorem ipsum dolor sit amet, con adipiscing elit, sed do eiusmod
          </h1>
        </Link>

        <p className='truncate'>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </p>
      </div>

      {/* <p className='mt-2 lg:mt-0'>published</p> */}
    </div>
  );
};

export default Posts;
