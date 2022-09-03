import { Divider, Flex } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import Footer from '../../components/Footer';
import { Content } from '../../components/Blog';
import Banner from '../../components/Blog/Banner';
import Layout from '../../components/UI/MainLayout';
import { trpc } from '../../utils/trpc';

const Trending: NextPage = () => {
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

  return (
    <Layout>
      <section className='container my-5'>
        <Banner title='featured' />

        <div className='mt-10'>
          <div className=''>
            <Divider borderColor='#d5d5d5' />

            <h1 className='heading-2 uppercase py-5'>Charity News</h1>
            <Divider borderColor='#d5d5d5' />
          </div>

          {news}

          <div className='py-20 flex flex-col items-center justify-center w-full'>
            {/* {<button className='link mb-6'>Load More</button>} */}
            <Divider borderColor='#d5d5d5' />
          </div>
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </Layout>
  );
};

export default Trending;
