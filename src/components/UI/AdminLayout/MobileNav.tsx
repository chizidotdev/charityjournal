import {
  FlexProps,
  Flex,
  useColorModeValue,
  IconButton,
  Text,
  Avatar,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { IoMdSettings } from 'react-icons/io';
import { signOut } from 'next-auth/react';

interface MobileProps extends FlexProps {
  onOpen: () => void;
  pageTitle: string;
}
const MobileNav = ({ pageTitle, onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      mr={{ md: 10 }}
      px={{ base: 4, md: 4 }}
      pt={{ lg: 10 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      justifyContent='space-between'
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<FiMenu />}
      />

      <Text
        // display={{ base: 'flex', md: 'none' }}
        fontSize='2xl'
        fontWeight='bold'
        // ml={5}
      >
        {pageTitle}
      </Text>

      {/* <Box display={{ base: 'none', lg: 'block' }} width={'full'} px={20} maxW={'40rem'}>
        <Input placeholder='Search' _placeholder={{ fontSize: 14 }} />
      </Box> */}

      <HStack spacing={{ xl: 7 }}>
        <Flex alignItems={'center'} mr={2}>
          <Menu>
            <MenuButton transition='all 0.3s' _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar size={'sm'} />
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem onClick={() => signOut()}>Log out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <IconButton
          display={{ base: 'none', sm: 'flex' }}
          variant='ghost'
          aria-label='open menu'
          icon={<IoMdSettings />}
        />
      </HStack>
    </Flex>
  );
};

export default MobileNav;
