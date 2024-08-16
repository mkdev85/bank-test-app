import * as React from 'react';

import { Box } from '@mui/material';

import Navbar from './Navbar';

export interface LayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          mt: 2,
        }}
      ></Box>
      <main>{children}</main>
    </>
  );
}

export default MainLayout;
