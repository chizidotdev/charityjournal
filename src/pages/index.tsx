import type { NextPage } from 'next';
import Image from 'next/image';
import Footer from '../components/Footer';
import SideBar from '../components/Sidebar';
import Trending from '../components/Blog';
// import { trpc } from '../utils/trpc';
import { signIn } from 'next-auth/react';

const Home: NextPage = () => {
  // const posts = trpc.useQuery(['post.getAllPosts']);
  // const deletePost = trpc.useMutation(['post.deletePost']);

  return (
    <>
      <div className='container my-10'>
        <section className='flex lg:gap-5'>
          <div className='flex charity-month' onClick={() => signIn()}>
            <div className='sm:w-3/4 min-w-[280px] sm:mr-[20%]'>
              <h1 className='heading-1 mb-3 md:mb-5'>
                Charity Of <br /> The Month
              </h1>
              <p className='caption mr-[20%]'>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
            </div>
          </div>

          <div className='flex gap-5'>
            <div className='feature_card hidden xl:flex flex-col w-64 min-w-[256px]'>
              <div className='h-2/5'>
                <Image src='/unsplash.png' width={500} height={300} alt='' />
              </div>
              <div className='feature_card-content p-5 text-white'>
                <h1 className='heading-2-sm mb-1'>Lorem Ipsum Dolor</h1>
                <p className='caption-sm'>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
                </p>
              </div>
            </div>
            <div className='feature_card hidden lg:flex flex-col w-64 min-w-[256px]'>
              <div className='h-2/5'>
                <Image src='/unsplash.png' width={500} height={300} alt='' />
              </div>
              <div className='feature_card-content p-5 text-white'>
                <h1 className='heading-2-sm mb-1'>Lorem Ipsum Dolor</h1>
                <p className='caption-sm'>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className=' flex my-16 gap-10'>
          <div>
            <Trending title='Featured' nolink />
            <div className='py-10' />
            <Trending title='Most Recent' />
          </div>

          <div className='hidden lg:block w-2/5'>
            <SideBar />
          </div>
        </section>
      </div>
      <section>
        <Footer />
      </section>
    </>
  );
};

export default Home;
