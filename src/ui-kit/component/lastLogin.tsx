'use client';

import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';
import moment from 'moment';

const LastLogin: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<string | null>(null);

  useEffect(() => {
    const dateTime = moment().format('dddd, MMMM D, YYYY h:mm A');
    setCurrentDateTime(dateTime);
  }, []);

  if (!currentDateTime) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" component="div" color="textPrimary">
        Last Login: <strong>{currentDateTime}</strong>
      </Typography>
    </Box>
  );
};

export default LastLogin;
