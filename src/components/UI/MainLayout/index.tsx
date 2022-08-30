import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className='sticky top-0 z-10'>
        <Navbar />
      </div>
      {children}
    </>
  );
};

export default Layout;
