import { Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FiClock } from 'react-icons/fi';
import AdminLayout from '../../../components/UI/AdminLayout';
import { requireAuth } from '../../../utils/requireAuth';
import { trpc } from '../../../utils/trpc';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return requireAuth(context, (session) => {
    return { props: { session } };
  });
};

const Post = () => {
  useSession({ required: true });

  const router = useRouter();
  const { data, isLoading, isError } = trpc.useQuery(
    ['post.getPost', { id: Number(router.query.id) }],
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    const body = document.getElementById('body-admin');
    if (body) {
      body.innerHTML = data?.content || '';
    }
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
    // console.log('data====', data.content);

    post = (
      <section className='my-10'>
        {/* Heading */}
        <VStack align='center' px={{ md: 12, lg: '14%' }}>
          <div className='relative self-center w-full h-52 md:h-60 lg:h-72 rounded-md overflow-hidden'>
            <Image src={data.image} alt='' layout='fill' objectFit='cover' />
          </div>

          <div className='w-full flex items-center justify-between py-2'>
            <div className='text-xs opacity-50 flex items-center gap-2'>
              <FiClock />
              <span>
                {data.updatedAt.toDateString()} at {data.updatedAt.toLocaleTimeString()}
              </span>
            </div>

            {/* <div className='flex items-center gap-5'>
              <Divider width={10} borderColor='#d5d5d5' />
              <span className='uppercase opacity-50 text-xs'>by John Doe</span>
            </div> */}
          </div>

          <h1 className='heading-2 md:text-center lg:px-10'>{data?.title}</h1>
          <p className=' text-gray-700 md:text-center lg:px-10'>{data?.excerpt}</p>
        </VStack>

        {/* Content */}
        <VStack py={{ base: 12, md: 20, lg: 20 }} px={{ md: 8, xl: '10%' }}>
          <HStack justify='space-between' align='flex-start' gap={8}>
            {/* <Divider
              display={{ base: 'none', md: 'flex' }}
              mt={5}
              orientation='vertical'
              height={40}
              borderColor='#373435'
            /> */}
            <div id='body-admin' className='w-full lg:px-20'></div>
          </HStack>
        </VStack>
      </section>
    );
  }

  return <AdminLayout pageTitle='Posts'>{post}</AdminLayout>;
};

export default Post;
