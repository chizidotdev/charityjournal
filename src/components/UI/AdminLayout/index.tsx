import React, { ReactNode } from 'react';
import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import MobileNav from './MobileNav';
import SidebarContent from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
}

export default function AdminLayout({ children, pageTitle }: LayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH='100vh' bg={'#fff'}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'flex' }} />

      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* mobilenav */}
      <MobileNav onOpen={onOpen} pageTitle={pageTitle} />
      <Box ml={{ base: 0, md: 60 }} p='4' px={{ lg: 10 }}>
        {children}
      </Box>
    </Box>
  );
}
