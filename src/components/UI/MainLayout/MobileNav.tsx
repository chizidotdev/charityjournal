import { SearchIcon } from '@chakra-ui/icons';
import {
  Stack,
  useColorModeValue,
  useDisclosure,
  Flex,
  Link,
  Text,
  Divider,
  Center,
  Input,
} from '@chakra-ui/react';
import { Session } from 'next-auth';
import { NAV_ITEMS, NavItem } from './navItems';

interface MobileNavProps {
  session: Session | null;
}

const MobileNav = ({ session }: MobileNavProps) => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ lg: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <div className='flex items-center'>
        <div className='w-full'>
          <Input />
        </div>
        <Center height='30px' mx={'4'}>
          <Divider orientation='vertical' color={'#000'} />
        </Center>
        <SearchIcon className='cursor-pointer' />
      </div>
      <Divider />
      {session ? (
        <>
          <MobileNavItem label='Dashboard' href='/admin' />
          <MobileNavItem label='Logout' href='/api/auth/signout' />
        </>
      ) : (
        <MobileNavItem label='Login' href='/api/auth/signin' />
      )}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
      </Flex>
    </Stack>
  );
};

export default MobileNav;
