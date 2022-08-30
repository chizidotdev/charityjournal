import { BoxProps, useColorModeValue, Flex, CloseButton, Box } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import NavItem, { LinkItems } from './NavItem';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      flexDirection={'column'}
      transition={{ base: '2s ease-in-out', md: 'none' }}
      bg={'#4b4a4a'}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      minH='full'
      pt={{ lg: 5 }}
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' mb='5' justifyContent='space-between'>
        <Link href='/'>
          <div className='logo w-28 h-8 md:w-36 md:h-10 relative cursor-pointer'>
            <Image alt='' src='/logob-white.png' layout='fill' priority />
          </div>
        </Link>
        <CloseButton color='white' display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      {LinkItems.map((link) => {
        return (
          <NavItem key={link.name} icon={link.icon} href={link.link}>
            {link.name}
          </NavItem>
        );
      })}
    </Box>
  );
};

export default SidebarContent;
