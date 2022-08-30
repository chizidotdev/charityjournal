import { FlexProps, Flex, Icon, Link } from '@chakra-ui/react';
import { IconType } from 'react-icons';

import { FiEdit } from 'react-icons/fi';
import { IoIosExit } from 'react-icons/io';
import { MdLibraryBooks, MdAddToPhotos } from 'react-icons/md';
import { RiHome5Fill, RiBuildingLine } from 'react-icons/ri';

interface NavItemProps extends FlexProps {
  icon?: IconType;
  href: string;
  children: string;
}

const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  return (
    <Link href={href || '/'} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        fontSize={14}
        align='center'
        p='4'
        px='7'
        // mx="4"
        borderRadius='0 0 0.3rem 0.3rem'
        role='group'
        cursor='pointer'
        color='white'
        _hover={{
          fontWeight: 'bold',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='20'
            _groupHover={{
              fontSize: '21',
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;

export interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
}
export const LinkItems: Array<LinkItemProps> = [
  { name: 'Dashboard', icon: RiHome5Fill, link: '/admin' },
  // {
  //   name: 'Posts',
  //   icon: MdOutlineMenuBook,
  //   children: [
  //     {
  //       name: 'All Posts',
  //       icon: IoIosExit,
  //     },
  //     {
  //       name: 'Create Post',
  //       icon: FiEdit,
  //     },
  //     // {
  //     //   name: '',
  //     //   icon: IoIosListBox,
  //     // },
  //   ],
  // },
  { name: 'Posts', icon: MdLibraryBooks, link: '/admin/posts' },
  { name: 'Create Post', icon: FiEdit, link: '/admin/posts/create' },
  { name: 'Charity', icon: RiBuildingLine, link: '/admin/charity' },
  { name: 'Add Charity', icon: MdAddToPhotos, link: '/admin/charity/create' },
  {
    name: 'Logout',
    icon: IoIosExit,
    link: '/api/auth/signout',
  },
];
