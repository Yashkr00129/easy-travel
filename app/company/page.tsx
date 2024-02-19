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
import { CompanySearch } from '../components/company/CompanySearch'; 
import { CompanysTable } from '@/app/components/company/CompanyTable';
import  {SearchBox}  from '../components/SearchBox';

export default function CompanyPage() {
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
                <Typography variant='h4'>Companys</Typography>
                <div>
                  <Button
                    startIcon={
                      <SvgIcon fontSize='small'>
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant='contained'
                  >
                    Add Company
                  </Button>
                </div>
              </Stack>
              <SearchBox placeholder='Search Company' />
              <CompanysTable />
            </Stack>
          </Container>
        </Box>
      </SidebarLayout>
    </>
  );
}
