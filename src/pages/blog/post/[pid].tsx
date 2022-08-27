import { Box, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Content } from '../../../components/Blog';
import Footer from '../../../components/Footer';

const Post = () => {
  return (
    <>
      <section className='container my-10'>
        {/* Heading */}
        <VStack align='center' px={{ base: 2, md: 12, lg: '14%' }}>
          <div className='relative self-center w-full h-52 md:h-60 lg:h-72 rounded-md overflow-hidden'>
            <Image src='/unsplash.png' alt='' layout='fill' objectFit='cover' />
          </div>

          <div className='w-full flex items-center justify-between py-2'>
            <div className='text-xs opacity-50 flex items-center gap-2'>
              <span>Aug 15</span>
              <Divider width={3} borderColor='#373435' />
              <span>5 min read</span>
            </div>

            <div className='flex items-center gap-5'>
              <Divider width={10} borderColor='#d5d5d5' />
              <span className='uppercase opacity-50 text-xs'>by John Doe</span>
            </div>
          </div>

          <h1 className='heading-2 md:text-center lg:px-10'>
            Lorem ipsum dolor sit amet, con adipiscing elit, sed do eiusmod sit amet.
          </h1>
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
            <Text>
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out
              print, graphic or web designs. The passage is attributed to an unknown typesetter in
              the 15th century who is thought to have scrambled parts of Cicero&apos;s De Finibus
              Bonorum et Malorum for use in a type specimen book. It usually begins with:
              <br />
              <br />
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.”
              <br />
              The purpose of lorem ipsum is to create a natural looking block of text (sentence,
              paragraph, page, etc.) that doesn&apos;t distract from the layout. A practice not
              without controversy, laying out pages with meaningless filler text can be very useful
              when the focus is meant to be on design, not content.
              <br />
              <br />
              The passage experienced a surge in popularity during the 1960s when Letraset used it
              on their dry-transfer sheets, and again during the 90s as desktop publishers bundled
              the text with their software. Today it&apos;s seen all around the web; on templates,
              websites, and stock designs. Use our generator to get your own, or read on for the
              authoritative history of lorem ipsum.
              <br />
              <br />
              <span className='heading-4'>As Cicero would put it, “Um, not so fast.”</span>
              <br />
              <br />
              Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text.
              “It&nbsp;s not Latin, though it looks like it, and it actually says nothing,” Before &
              After magazine answered a curious reader, “Its ‘words’ loosely approximate the
              frequency with which letters occur in English, which is why at a glance it looks
              pretty real.”
              <br />
              <br />
              As Cicero would put it, “Um, not so fast.”
              <br />
              <br />
              The placeholder text, beginning with the line “Lorem ipsum dolor sit amet, consectetur
              adipiscing elit”, looks like Latin because in its youth, centuries ago, it was Latin.
              Richard McClintock, a Latin scholar from Hampden-Sydney College, is credited with
              discovering the source behind the ubiquitous filler text. In seeing a sample of lorem
              ipsum, his interest was piqued by consectetur—a genuine, albeit rare, Latin word.
              Consulting a Latin dictionary led McClintock to a passage from De Finibus Bonorum et
              Malorum (“On the Extremes of Good and Evil”), a first-century B.C. text from the Roman
              philosopher Cicero.
            </Text>
          </HStack>
        </VStack>

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

          <Content />
          <Content />
        </Box>
      </section>

      <section>
        <Footer />
      </section>
    </>
  );
};

export default Post;
