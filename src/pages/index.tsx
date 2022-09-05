import type { NextPage } from 'next';
import Image from 'next/image';
import SideBar from '../components/Sidebar';
import Trending, { Content } from '../components/Blog';
import Layout from '../components/UI/MainLayout';
import { useSession } from 'next-auth/react';
import { Divider, Flex } from '@chakra-ui/react';
import { trpc } from '../utils/trpc';
import Link from 'next/link';
// import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(['post.getPublishedPosts'], {
    refetchOnWindowFocus: false,
  });

  let news = <div></div>;

  if (isLoading) {
    news = <div>Loading...</div>;
  }

  if (data) {
    if (data.length === 0) {
      news = (
        <Flex justify={'center'} py={10}>
          No posts found...
        </Flex>
      );
    } else {
      news = (
        <>
          {data.map((post) => (
            <Content key={post.id} image={post.image} layout='horizontal' post={post} />
          ))}
        </>
      );
    }
  }

  // const posts = trpc.useQuery(['post.getAllPosts']);
  // const deletePost = trpc.useMutation(['post.deletePost']);

  return (
    <Layout>
      <div className='container my-7 md:my-10'>
        <section className='flex lg:gap-5'>
          <div className='flex charity-month'>
            <div className='sm:w-3/4 min-w-[250px] sm:mr-[20%]'>
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
                <Image
                  src={`https://picsum.photos/id/${Math.round(Math.random() * 900)}/300/200/`}
                  width={500}
                  height={300}
                  alt=''
                  className='image-animate'
                />
              </div>
              <div className='feature_card-content p-5 text-white'>
                <h1 className='heading-animate heading-2-sm mb-1'>Lorem Ipsum Dolor</h1>
                <p className='caption-sm'>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
                </p>
              </div>
            </div>
            <div className='feature_card hidden lg:flex flex-col w-64 min-w-[256px]'>
              <div className='h-2/5'>
                <Image
                  src='https://picsum.photos/300/200'
                  width={500}
                  height={300}
                  alt=''
                  className='image-animate'
                />
              </div>
              <div className='feature_card-content p-5 text-white'>
                <h1 className='heading-animate heading-2-sm mb-1'>Lorem Ipsum Dolor</h1>
                <p className='caption-sm'>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className=' flex my-10 md:my-16 gap-10'>
          <div>
            <Trending layout='normal' title='Featured' nolink />
            <div className='py-10' />
            <div className=''>
              <div>
                <Divider borderColor='#d5d5d5' />
                <div className='flex items-center justify-between py-5'>
                  <h1 className='heading-2 uppercase'>Latest news</h1>
                  <div className='link'>{<Link href='/blog'>View all</Link>}</div>
                </div>
                <Divider borderColor='#d5d5d5' />
              </div>

              {news}
            </div>
          </div>

          <div className='hidden lg:block w-2/5'>
            <SideBar />
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
