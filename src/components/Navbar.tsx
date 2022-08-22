import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Menu,
  Avatar,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Divider,
  Input,
  Center,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SearchIcon } from '@chakra-ui/icons';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const [searchActive, setSearchActive] = useState(false);
  return (
    <>
      <header className='container '>
        <div className='flex items-center justify-between py-3'>
          <div className='block md:hidden'>
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </div>

          <div className='w-28 h-8 sm:w-32 sm:h-9 relative'>
            <Image alt='' src='/charity.png' layout='fill' priority />
          </div>

          <div className='flex items-center gap-5'>
            <Button
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              // border={'1px solid rgba(40, 179, 166, 1)'}
              bg={'rgba(40, 179, 166, 1)'}
              _hover={{
                bg: 'rgba(40, 179, 166, 0.8)',
              }}
            >
              Subscribe
            </Button>
            <div className='hidden sm:block'>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar size={'sm'} src='' />
                </MenuButton>
                <MenuList>
                  <MenuItem>Link 1</MenuItem>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem>Link 3</MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </header>
      <Divider />
      <div className='container hidden md:flex items-center justify-between mt-5'>
        <DesktopNav />
        <div className='flex items-center'>
          <div className={`${searchActive && 'active'} search-bar overflow-hidden`}>
            <Input onBlur={() => setSearchActive(false)} />
          </div>
          <Center height='30px' mx={'10'}>
            <Divider orientation='vertical' color={'#000'} />
          </Center>
          <SearchIcon className='cursor-pointer' onClick={() => setSearchActive((prev) => !prev)} />
        </div>
      </div>
    </>
  );
}

function ChakraNavbar() {
  const { isOpen, onToggle } = useDisclosure();
  const [searchActive, setSearchActive] = useState(false);

  return (
    <Box>
      <div className='flex flex-col gap-8'>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4, md: 20, lg: 40 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}
        >
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} alignItems={'center'} justify={{ base: 'center', md: 'start' }}>
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}
            >
              <div className='w-28 h-8 sm:w-36 sm:h-10 relative'>
                <Image alt='' src='/charity.png' layout='fill' priority />
              </div>
            </Text>
          </Flex>

          <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
            <Button
              href={'#'}
              as={'a'}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'rgba(40, 179, 166, 1)'}
              _hover={{
                bg: 'rgba(40, 179, 166, 0.7)',
              }}
            >
              Subscribe
            </Button>
            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
        <Flex
          display={{ base: 'none', md: 'flex' }}
          alignItems='center'
          justifyContent={'space-between'}
          ml={10}
          px={{ base: 4, md: 20, lg: 40 }}
        >
          <DesktopNav />
          <div>
            <label htmlFor='search' className='block text-sm font-medium text-gray-700' hidden>
              Search
            </label>
            <div className='mt-1 relative rounded-md shadow-sm'>
              <input
                type='text'
                name='search'
                id='search'
                className={`${
                  searchActive ? 'block' : 'hidden'
                } focus:[#28B3A6] focus:border-[#28B3A6] w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md`}
                placeholder='Search '
              />
              <div
                className='absolute inset-y-0 right-0 flex items-center cursor-pointer'
                onClick={() => setSearchActive((prev) => !prev)}
              >
                <SearchIcon />
              </div>
            </div>
          </div>
        </Flex>
      </div>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
