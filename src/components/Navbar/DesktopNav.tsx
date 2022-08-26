// import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  useColorModeValue,
  Stack,
  Popover,
  PopoverTrigger,
  Link,
  // PopoverContent,
  // Flex,
  // Icon,
  // Box,
  // Text,
} from '@chakra-ui/react';
// import NavLink from 'next/link';
import { NAV_ITEMS } from './navItems';

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  // const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4} pb={6}>
      {NAV_ITEMS.map((navItem) => (
        <Popover trigger={'hover'} placement={'bottom-start'} key={navItem.label}>
          <PopoverTrigger>
            <Link
              px={5}
              fontSize={'sm'}
              width={'max-content'}
              color={linkColor}
              _hover={{
                textDecoration: 'none',
              }}
              href={navItem.href || '/'}
            >
              <span className='nav-link'>{navItem.label}</span>
            </Link>
          </PopoverTrigger>

          {/* {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )} */}
        </Popover>
      ))}
    </Stack>
  );
};

// const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
//   return (
//     <Link
//       href={href}
//       role={'group'}
//       display={'block'}
//       p={2}
//       rounded={'md'}
//       _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
//     >
//       <Stack direction={'row'} align={'center'}>
//         <Box>
//           <Text transition={'all .3s ease'} _groupHover={{ color: 'pink.400' }} fontWeight={500}>
//             {label}
//           </Text>
//           <Text fontSize={'sm'}>{subLabel}</Text>
//         </Box>
//         <Flex
//           transition={'all .3s ease'}
//           transform={'translateX(-10px)'}
//           opacity={0}
//           _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
//           justify={'flex-end'}
//           align={'center'}
//           flex={1}
//         >
//           <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
//         </Flex>
//       </Stack>
//     </Link>
//   );
// };

export default DesktopNav;
