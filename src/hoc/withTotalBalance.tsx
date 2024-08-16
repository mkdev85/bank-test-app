import React from 'react';

import { TotalBalance } from '@/pages/totalBalance';
import { Box } from '@mui/material';

const withTotalBalance = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => (
    <>
      <Box sx={{ mt: 2 }}>
        <TotalBalance />
      </Box>
      <WrappedComponent {...props} />
    </>
  );
};

export default withTotalBalance;
