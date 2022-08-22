import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Stack,
  useColorModeValue,
  useDisclosure,
  Flex,
  Icon,
  Collapse,
  Link,
  Text,
  Divider,
  Center,
  Input,
} from '@chakra-ui/react';
import { NAV_ITEMS, NavItem } from './navItems';

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
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
      <MobileNavItem label='Login' href='/api/login' />
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

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
        {/* {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )} */}
      </Flex>

      {/* <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse> */}
    </Stack>
  );
};

export default MobileNav;
