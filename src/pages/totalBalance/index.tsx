import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import LastLogin from '@/ui-kit/component/lastLogin';

import { useAppSelector } from '@/hooks/utilityHooks';

import { formatCurrency } from '@/utils/formatters';


export const TotalBalance = () => {
  const balance = useAppSelector(state => state.balance);
  const [totalBalance, setTotalBalance] = useState<number>(0);

  useEffect(() => {
    setTotalBalance(balance?.data?.currentBalance);
  }, [balance]);

  if (totalBalance === null) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'end',
        mr: 10,
        flexDirection: 'column',
        mt: 2,
      }}
    >
      <Box>
        <Typography variant="h4" gutterBottom>
          Total Balance: {formatCurrency(totalBalance)}
        </Typography>
      </Box>
      <Box>
        <LastLogin />
      </Box>
    </Box>
  );
};
