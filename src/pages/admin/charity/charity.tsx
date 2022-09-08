import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
} from '@chakra-ui/react';
import { Charity } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/UI/AdminLayout';
import Modal from '../../../components/UI/Modal';
import { trpc } from '../../../utils/trpc';

const Charity = () => {
  useSession({ required: true });

  const { data, isLoading, isError } = trpc.useQuery(['charity.getCharityOrgs'], {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isError) toast('Error loading Charitys... Please refresh.', { type: 'error' });

  let charity: JSX.Element = <div></div>;

  if (isLoading) {
    charity = <p>Loading...</p>;
  }

  if (data) {
    charity = (
      <>
        {data.length === 0 ? (
          <p>No Charitys found...</p>
        ) : (
          <>
            <TableContainer>
              <Table variant='simple'>
                <TableCaption>Charity information table</TableCaption>
                <Thead>
                  <Tr>
                    <Th isNumeric>id</Th>
                    <Th>name</Th>
                    <Th>website</Th>
                    <Th>rating</Th>
                    <Th>created_at</Th>
                    <Th>updated_at</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                {data.map((charity) => (
                  <CharityItem key={charity.id} charity={charity} />
                ))}
              </Table>
            </TableContainer>
          </>
        )}
      </>
    );
  }

  return (
    <AdminLayout pageTitle='Organisations'>
      <div className='lg:py-5 sm:px-5 lg:px-0'>
        {/* <section className='flex gap-5'>
          <CharityType name='All Charitys' />
          <CharityType name='Pending' />
        </section> */}

        <section className='flex flex-col gap-3 md:gap-5 py-5 md:py-7'>{charity}</section>
      </div>
    </AdminLayout>
  );
};

interface CharityItemProps {
  Charity: Charity;
}

const CharityItem = ({ Charity }: CharityItemProps) => {
  const deleteCharity = trpc.useMutation(['protected.deleteCharity']);
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    deleteCharity.mutate(
      { CharityId: Charity.id },
      {
        onSuccess: () => {
          toast('User deleted successfully', { type: 'success' });
        },
        onError: (error) => {
          toast(error.message, { type: 'error' });
        },
      }
    );
  };

  return (
    <Tbody fontSize={'sm'}>
      <Modal
        title='Delete Charity'
        description='Are you sure you want to delete this Charity?'
        callback={handleDelete}
        open={open}
        setOpen={setOpen}
      />
      <Tr>
        <Td isNumeric>{charity.id}.</Td>
        <Td>
          <Link href='/admin/Charitys/[id]' as={`/admin/Charitys/${Charity.id}`}>
            <h2 className='cursor-pointer max-w-xs truncate hover:underline'>{Charity.title}</h2>
          </Link>
        </Td>
        <Td>
          {Charity.createdAt.toDateString()}, {Charity.createdAt.toLocaleTimeString()}
        </Td>
        <Td>
          {Charity.updatedAt.toDateString()}, {Charity.updatedAt.toLocaleTimeString()}
        </Td>
        <Td>{Charity.published ? <Text>Published</Text> : <Text>Not Published</Text>}</Td>
        <Td className='flex gap-3'>
          <Link href='/admin/Charitys/edit/[id]' as={`/admin/Charitys/edit/${Charity.id}`}>
            <div className='cursor-pointer hover:text-[#1db3a6]'>
              <EditIcon />
            </div>
          </Link>

          <div onClick={() => setOpen(true)} className='cursor-pointer hover:text-[#1db3a6]'>
            <DeleteIcon />
          </div>
        </Td>
      </Tr>
    </Tbody>
  );
};

export default Charity;
