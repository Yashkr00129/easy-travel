'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SidebarLayout } from '@/app/components/dashboard/Layout';
import { TextField, Button, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';

export default function CreateProfile() {
  const router = useRouter();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    axios
      .get('/api/auth/me')
      .then((res) => {
        if (res.data.status === 'success') {
          router.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    try {
      const res = await axios.post('/api/auth', { ...formData, email });
      if (res.data.status === 'success') return router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SidebarLayout>
      {/* I've signed in through clerk, but i dont have a profile in our own database. */}
      {/* then make a profile in our own database */}
      {/* dont let the user use the app without making a profile in our own database */}

      <Stack spacing={2} justifyContent={'center'} alignItems={'center'}>
        <Stack spacing={2} sx={{ width: '60%' }}>
          <Typography variant='h4' color='primary'>
            COMPLETE YOUR PROFILE
          </Typography>
          <TextField
            label='Name'
            name='name'
            autoComplete='name'
            onChange={handleChange}
            sx={{ marginTop: '2rem' }}
          />
          <TextField
            label='Date Of Birth'
            name='dateOfBirth'
            type='date'
            autoComplete='dateOfBirth'
            onChange={handleChange}
          />
          <Button onClick={() => onSubmit()} variant='contained'>
            Submit
          </Button>
        </Stack>
      </Stack>
    </SidebarLayout>
  );
}
