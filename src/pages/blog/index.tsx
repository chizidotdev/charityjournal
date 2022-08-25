import { Divider } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import Footer from '../../components/Footer';
import { Content } from '../../components/Trending';
import Banner from '../../components/Trending/Banner';

const Trending: NextPage = () => {
  return (
    <>
      <section className='container my-10'>
        <Banner title='Trending' />

        <div className='mt-10'>
          <div className=''>
            <Divider borderColor='#d5d5d5' />
            <div className='section-nav flex items-center justify-center gap-10 p-5 px-10'>
              <span className='section-link active'>All</span>
              <span className='section-link'>Education</span>
              <span className='section-link'>Health</span>
              <span className='section-link'>Culture</span>
              {/* <span className='section-link'>Education</span>
              <span className='section-link'>Health</span>
              <span className='section-link'>Culture</span> */}
            </div>
            <Divider borderColor='#d5d5d5' />
          </div>

          <Content />
          <Content />
          <Content />
          <Content />
          <Content />
          <Content />

          <div className='py-20 flex flex-col items-center justify-center w-full'>
            <button className='section-link mb-6'>Load More</button>
            <Divider borderColor='#d5d5d5' />
          </div>
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </>
  );
};

export default Trending;
