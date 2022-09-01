import { Box, Divider, Flex, HStack, VStack, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Content } from '../../../components/Blog';
import Footer from '../../../components/Footer';
import Layout from '../../../components/UI/MainLayout';
import { trpc } from '../../../utils/trpc';

const Post = () => {
  const router = useRouter();
  const { data, isLoading, isError } = trpc.useQuery(
    ['post.getPost', { id: Number(router.query.id) }],
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    const body = document.getElementById('body-user');
    if (body) {
      body.innerHTML = data?.content || '';
    }

    console.log('data====', data?.content);
  }, [data]);

  let post: JSX.Element = <div></div>;

  if (isLoading) {
    post = (
      <Flex my={20} align='center'>
        <Text>Loading...</Text>
      </Flex>
    );
  }

  if (isError) {
    post = (
      <Flex my={20} align='center'>
        <p>Error loading post...</p>
      </Flex>
    );
  }

  if (data) {
    post = (
      <>
        <VStack align='center' px={{ base: 2, md: 12, lg: '14%' }}>
          <div className='relative self-center w-full h-52 md:h-60 lg:h-72 rounded-md overflow-hidden'>
            <Image src='/unsplash.png' alt='' layout='fill' objectFit='cover' />
          </div>

          {/* <div className='w-full flex items-center justify-between py-2'>
            <div className='text-xs opacity-50 flex items-center gap-2'>
              <span>Aug 15</span>
              <Divider width={3} borderColor='#373435' />
              <span>5 min read</span>
            </div>

            <div className='flex items-center gap-5'>
              <Divider width={10} borderColor='#d5d5d5' />
              <span className='uppercase opacity-50 text-xs'>by John Doe</span>
            </div>
          </div> */}

          <h1 className='heading-2 md:text-center lg:px-10 md:py-5'>{data.title}</h1>
        </VStack>

        {/* Content */}
        <VStack py={{ base: 12, md: 20, lg: 20 }} px={{ base: 0, md: 8, xl: '10%' }}>
          <HStack justify='space-between' align='flex-start' gap={8}>
            <Divider
              display={{ base: 'none', md: 'flex' }}
              mt={5}
              orientation='vertical'
              height={40}
              borderColor='#373435'
            />
            <div id='body-user' className='w-full'></div>
          </HStack>
        </VStack>
      </>
    );
  }

  return (
    <Layout>
      <div className='container my-10'>
        {/* Heading */}
        <section>{post}</section>

        {/* Tags */}

        {/* Read More */}
        <Box py={10}>
          <div className=''>
            <div>
              <Divider borderColor='#d5d5d5' />
              <div className='flex items-center justify-between py-5'>
                <h1 className='heading-2-sm uppercase'>Read More</h1>
                <div className='link'>
                  <Link href='/blog'>View all</Link>
                </div>
              </div>
              <Divider borderColor='#d5d5d5' />
            </div>
          </div>

          <Content layout='horizontal' />
          <Content layout='horizontal' />
        </Box>
      </div>

      <section>
        <Footer />
      </section>
    </Layout>
  );
};

export default Post;
