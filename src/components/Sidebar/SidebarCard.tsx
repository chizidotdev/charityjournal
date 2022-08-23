import React from 'react';

interface SidebarCardProps {
  title?: string;
  body?: string;
  link?: string;
}

export const SidebarCard: React.FC<SidebarCardProps> = ({}) => {
  return (
    <div>
      <h1>Career Opportunities</h1>
      <p></p>
    </div>
  );
};
