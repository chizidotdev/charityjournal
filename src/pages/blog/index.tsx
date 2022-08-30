import { Divider } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import Footer from '../../components/Footer';
import { Content } from '../../components/Blog';
import Banner from '../../components/Blog/Banner';
import Layout from '../../components/UI/MainLayout';

const Trending: NextPage = () => {
  return (
    <Layout>
      <section className='container my-5'>
        <Banner title='Trending' />

        <div className='mt-10'>
          <div className=''>
            <Divider borderColor='#d5d5d5' />

            <h1 className='heading-2 uppercase py-5'>MOST RECENT</h1>
            {/* <div className='section-nav flex items-center justify-center gap-10 p-5 px-10'>
              <span className='section-link active'>All</span>
              <span className='section-link'>Education</span>
              <span className='section-link'>Health</span>
              <span className='section-link'>Culture</span>
              <span className='section-link'>Education</span>
              <span className='section-link'>Health</span>
              <span className='section-link'>Culture</span>
            </div> */}
            <Divider borderColor='#d5d5d5' />
          </div>

          <Content
            layout='horizontal'
            image={`https://picsum.photos/id/${Math.round(Math.random() * 900)}/300/200/`}
          />
          <Content
            layout='horizontal'
            image={`https://picsum.photos/id/${Math.round(Math.random() * 900)}/300/200/`}
          />
          <Content
            layout='horizontal'
            image={`https://picsum.photos/id/${Math.round(Math.random() * 900)}/300/200/`}
          />
          <Content
            layout='horizontal'
            image={`https://picsum.photos/id/${Math.round(Math.random() * 900)}/300/200/`}
          />
          <Content
            layout='horizontal'
            image={`https://picsum.photos/id/${Math.round(Math.random() * 900)}/300/200/`}
          />
          <Content
            layout='horizontal'
            image={`https://picsum.photos/id/${Math.round(Math.random() * 900)}/300/200/`}
          />

          <div className='py-20 flex flex-col items-center justify-center w-full'>
            <button className='link mb-6'>Load More</button>
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
