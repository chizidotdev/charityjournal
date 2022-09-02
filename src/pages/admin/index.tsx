import { GetServerSideProps } from 'next';
import React from 'react';
import AdminLayout from '../../components/UI/AdminLayout';
import { requireAuth } from '../../utils/requireAuth';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return requireAuth(context, (session) => {
    return { props: { session } };
  });
};

const Admin = () => {
  return <AdminLayout pageTitle='Dashboard'>Admin</AdminLayout>;
};

export default Admin;
