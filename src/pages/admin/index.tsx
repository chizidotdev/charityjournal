// import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import React from 'react';
import AdminLayout from '../../components/UI/AdminLayout';
// import { requireAuth } from '../../utils/requireAuth';

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return requireAuth(context, (session) => {
//     return { props: { session } };
//   });
// };

const Admin = () => {
  useSession({ required: true });

  return <AdminLayout pageTitle='Dashboard'>Admin</AdminLayout>;
};

export default Admin;
