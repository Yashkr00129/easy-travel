'use client';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { SidebarLayout } from '@/app/components/dashboard/Layout';
import { UsersTable } from '@/app/components/user/UserTable';
import { UsersSearch } from '../components/user/UserSearch';

const UsersPage = () => {
  return (
    <>
      <SidebarLayout>
        <Head>
          <title>Users</title>
        </Head>
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth='xl'>
            <Stack spacing={3}>
              <Stack direction='row' justifyContent='space-between' spacing={4}>
                <Typography variant='h4'>Customers</Typography>
                <div>
                  <Button
                    startIcon={
                      <SvgIcon fontSize='small'>
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant='contained'
                  >
                    Add
                  </Button>
                </div>
              </Stack>
              <UsersSearch />
              <UsersTable />
            </Stack>
          </Container>
        </Box>
      </SidebarLayout>
    </>
  );
};

export default UsersPage;
