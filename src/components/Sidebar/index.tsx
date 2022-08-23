import React from 'react';
import { NewsletterCard, SidebarCard } from './SidebarCard';

const SideBar = () => {
  return (
    <div className='h-20'>
      <SidebarCard />

      <div className='py-10' />

      <NewsletterCard />
    </div>
  );
};

export default SideBar;
