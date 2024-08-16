import React, { useState, useEffect, useRef } from 'react';
import PinInput from 'react-pin-input';

import { MESSAGES } from '@/constant';
import { Box, Button, Typography } from '@mui/material';

import { useSnackbar } from '../../hooks/useSnackbar';

interface iPincodeProps {
  onSubmit: (pincode: string) => void;
}

const Pincode: React.FC<iPincodeProps> = ({ onSubmit }) => {
  const [timer, setTimer] = useState<number>(30);
  const [pincode, setPincode] = useState<string>('');
  const { showSnackbar } = useSnackbar();

  const pinInputRef = useRef<PinInput>(null);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handlePincodeChange = (value: string) => {
    setPincode(value);
  };

  const handlePincodeSubmit = () => {
    if (pincode.length === 4) {
      onSubmit(pincode);
    }
  };

  const handleSendNewPincode = () => {
    setTimer(30);
    setPincode('');
    if (pinInputRef.current) {
      pinInputRef.current.clear();
    }
    showSnackbar(MESSAGES.pinCodeSent, MESSAGES.info);
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        A 4-digit PIN code has been sent to your mobile number.
      </Typography>

      <PinInput
        length={4}
        initialValue={pincode}
        onChange={handlePincodeChange}
        type="numeric"
        inputMode="number"
        style={{ padding: '10px' }}
        inputStyle={{
          borderColor: 'gray',
          borderWidth: '2px',
          width: '50px',
          height: '50px',
          fontSize: '24px',
          textAlign: 'center',
        }}
        ref={pinInputRef}
      />

      <Typography variant="body1" sx={{ mt: 2 }}>
        {timer > 0 ? `Time remaining: ${timer} seconds` : 'Time expired. Please request a new PIN.'}
      </Typography>

      {timer > 0 ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handlePincodeSubmit}
          disabled={pincode.length !== 4}
          sx={{ mt: 3 }}
        >
          Submit PIN
        </Button>
      ) : (
        <Button variant="contained" color="secondary" onClick={handleSendNewPincode} sx={{ mt: 3 }}>
          Send New PIN
        </Button>
      )}
    </Box>
  );
};

export default Pincode;
