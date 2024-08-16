import React from 'react';

import { Button, CircularProgress, Box } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

interface iSubmitResetButtonsProps {
  isSubmitting: boolean;
}

const SubmitResetButtons: React.FC<iSubmitResetButtonsProps> = ({ isSubmitting }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Button
        color="secondary"
        variant="outlined"
        type="reset"
        startIcon={<CloseIcon />}
        sx={{ width: '48%' }}
        disabled={isSubmitting}
      >
        Reset
      </Button>
      <Button
        color="primary"
        variant="contained"
        type="submit"
        startIcon={isSubmitting ? <CircularProgress size={24} color="primary" /> : <SendIcon />}
        sx={{ width: '48%', position: 'relative' }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </Box>
  );
};

export default SubmitResetButtons;
