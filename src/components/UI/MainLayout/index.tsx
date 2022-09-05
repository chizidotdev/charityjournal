import React from 'react';
import Footer from '../../Footer';
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
      <div className='min-h-[40vh]'>{children}</div>
      <section>
        <Footer />
      </section>
    </>
  );
};

export default Layout;
