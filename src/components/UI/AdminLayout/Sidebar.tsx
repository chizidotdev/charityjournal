import {
  BoxProps,
  useColorModeValue,
  Flex,
  CloseButton,
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import { IoIosExit } from 'react-icons/io';
import NavItem, { LinkItems } from './NavItem';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      flexDirection={'column'}
      transition={{ base: '2s ease-in-out', md: 'none' }}
      bg={'#EBEBEB'}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      minH='full'
      pt={{ lg: 5 }}
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      {LinkItems.map((link) => {
        if (link.children) {
          return (
            <Accordion key={link.name} allowToggle>
              <AccordionItem>
                <AccordionButton
                  margin={0}
                  padding={0}
                  _expanded={{
                    borderRadius: '0 0 0.25rem 0.25rem',
                    bg: '#333333',
                    color: 'white',
                  }}
                >
                  <NavItem key={link.name} icon={link.icon}>
                    <Box display='flex' alignItems='center'>
                      {link.name}
                    </Box>
                    <AccordionIcon marginLeft={5} />
                  </NavItem>
                </AccordionButton>
                <AccordionPanel bg={'#D9D9D9'}>
                  {link.children.map((child) => (
                    <NavItem key={child.name} icon={child.icon}>
                      {child.name}
                    </NavItem>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          );
        } else
          return (
            <NavItem key={link.name} icon={link.icon}>
              {link.name}
            </NavItem>
          );
      })}

      <NavItem icon={IoIosExit} mt={'30%'}>
        Log Out
      </NavItem>
    </Box>
  );
};

export default SidebarContent;
