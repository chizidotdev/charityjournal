import {
  FlexProps,
  Flex,
  useColorModeValue,
  IconButton,
  Text,
  Avatar,
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Input,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { IoMdSettings } from 'react-icons/io';
import { BsBellFill } from 'react-icons/bs';

interface MobileProps extends FlexProps {
  onOpen: () => void;
  pageTitle: string;
}
const MobileNav = ({ pageTitle, onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
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
        fontFamily='monospace'
        fontWeight='bold'
        ml={5}
      >
        {pageTitle}
      </Text>

      <Box display={{ base: 'none', lg: 'block' }} width={'full'} px={20} maxW={'40rem'}>
        <Input placeholder='Search' _placeholder={{ fontSize: 14 }} />
      </Box>

      <HStack spacing={{ xl: 7 }}>
        <Flex alignItems={'center'} mr={2}>
          <Menu>
            <MenuButton transition='all 0.3s' _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem>Log out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <IconButton variant='ghost' aria-label='open menu' icon={<BsBellFill />} />
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
