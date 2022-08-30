import { FlexProps, Flex, Icon, Link, Text, Box } from '@chakra-ui/react';
import { IconType } from 'react-icons';

import { IoIosListBox, IoIosTrophy, IoMdHelpCircle } from 'react-icons/io';
import { FaGraduationCap } from 'react-icons/fa';
import { HiChatAlt2 } from 'react-icons/hi';
import { MdOutlineMenuBook, MdLibraryBooks } from 'react-icons/md';
import { RiHome5Fill, RiOpenSourceFill, RiStackFill, RiTeamFill } from 'react-icons/ri';

interface NavItemProps extends FlexProps {
  icon?: IconType;
  children: string | React.ReactNode;
}

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link href='#' style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        fontSize={14}
        align='center'
        p='4'
        px='7'
        // mx="4"
        borderRadius='0 0 0.3rem 0.3rem'
        role='group'
        cursor='pointer'
        _hover={{
          bg: '#333333',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='20'
            _groupHover={{
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
  children?: LinkItemProps[];
}
export const LinkItems: Array<LinkItemProps> = [
  { name: 'Dashboard', icon: RiHome5Fill },
  {
    name: 'Course Overview',
    icon: MdOutlineMenuBook,
    children: [
      {
        name: 'My Class',
        icon: MdLibraryBooks,
      },
      {
        name: 'Quiz',
        icon: IoIosTrophy,
      },
      {
        name: 'Task',
        icon: IoIosListBox,
      },
    ],
  },
  { name: 'My Team', icon: RiTeamFill },
  { name: 'Resources', icon: RiStackFill },
  { name: 'Open Source', icon: RiOpenSourceFill },
  { name: 'Certificate', icon: FaGraduationCap },
  { name: 'Help', icon: IoMdHelpCircle },
  { name: 'Feedback & Suggestions', icon: HiChatAlt2 },
];
