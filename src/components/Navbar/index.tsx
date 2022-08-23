import {
  IconButton,
  Button,
  Collapse,
  useDisclosure,
  Menu,
  Avatar,
  MenuButton,
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
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const [searchActive, setSearchActive] = useState(false);
  const router = useRouter();

  return (
    <>
      <header className='container '>
        <div className='flex items-center justify-between py-5'>
          <div className='block lg:hidden'>
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </div>

          <Link href='/'>
            <div className='w-28 h-8 md:w-36 md:h-10 relative'>
              <Image alt='' src='/charity.png' layout='fill' priority />
            </div>
          </Link>

          <div className='flex items-center gap-5'>
            <button className='sm:hidden link-hover text-base mt-1'>Subscribe</button>
            <button className='hidden sm:block btn-pri text-base'>Subscribe</button>
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
                  <MenuItem onClick={() => router.push('/api/auth/signin')}>Login</MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </header>

      <Divider borderColor='#d5d5d5' />

      <div className='container hidden lg:flex items-center justify-between mt-5'>
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
