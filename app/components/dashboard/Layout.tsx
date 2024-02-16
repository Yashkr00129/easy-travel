'use client';
import { useCallback, useEffect, useState, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import axios from 'axios';
import useProtect from '@/app/hooks/useProtect';
import Loading from '../Loading';

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%',
  minHeight: '70vh',
  padding: '1rem',
});

type Props = {
  children?: ReactNode;
};

export const SidebarLayout = (props: Props) => {
  // Here when we are calling this hook, what we want is to know when the hook is running and when the hook is finished
  const { loading } = useProtect();
  const { children } = props;
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);
  const router = useRouter();

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  if (loading) return <Loading />;

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      <Sidebar onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot>
        <LayoutContainer>{children}</LayoutContainer>
      </LayoutRoot>
    </>
  );
};
