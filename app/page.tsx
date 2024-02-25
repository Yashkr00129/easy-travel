'use client';
import { Button, Typography } from '@mui/material';
import { SidebarLayout as SidebarLayout } from './components/dashboard/Layout';
import axios from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
	return (
		<SidebarLayout>
			<Typography>Easy-Travel</Typography>
		</SidebarLayout>
	);
}
