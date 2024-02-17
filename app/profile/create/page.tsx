'use client';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SidebarLayout } from '@/app/components/dashboard/Layout';
import {
  TextField,
  Button,
  Stack,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import axios from 'axios';
import createProfile from '@/server/action/createProfile';
import { IRole } from '@/server/models/User';

export default function CreateProfile() {
  const router = useRouter();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    address: '',
    companyId: '',
    role: 'Admin',
    priorityLevel: 0,
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e?.target?.name]: e?.target?.value,
    });
  };

  const onSubmit = async () => {
    try {
      const dateOfBirth = new Date(formData.dateOfBirth);
      await createProfile({ ...formData, dateOfBirth, role: formData.role as IRole });

      // if (res.data.status === 'success') 
      return router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SidebarLayout>
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
          <TextField
            label='Email'
            name='email'
            autoComplete='email'
            onChange={handleChange}
          />
          <TextField
            label='Phone'
            name='phone'
            autoComplete='Phone'
            onChange={handleChange}
          />
          <TextField
            label='ConpanyId'
            name='conpanyId'
            autoComplete='ConpanyId'
            onChange={handleChange}
          />
          <TextField
            label='Address'
            name='address'
            autoComplete='address'
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel id='priorityLevel'>Priority Level</InputLabel>
            <Select
              label='Priority Level'
              name='priorityLevel'
              onChange={handleChange}
            >
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
              <MenuItem value={4}>Four</MenuItem>
              <MenuItem value={5}>Five</MenuItem>
              <MenuItem value={6}>Six</MenuItem>
              <MenuItem value={7}>Seven</MenuItem>
              <MenuItem value={8}>Eight</MenuItem>
              <MenuItem value={9}>Nine</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id='priorityLevel'>Role</InputLabel>
            <Select label='Role' name='role' onChange={handleChange}>
              <MenuItem value={'Admin'}>Admin</MenuItem>
              <MenuItem value={'Manager'}>Manager</MenuItem>
              <MenuItem value={'Guide'}>Guide</MenuItem>
              <MenuItem value={'Customer'}>Customer</MenuItem>
            </Select>
          </FormControl>

          <Button onClick={() => onSubmit()} variant='contained'>
            Submit
          </Button>
        </Stack>
      </Stack>
    </SidebarLayout>
  );
}
