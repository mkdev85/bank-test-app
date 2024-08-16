import React, { useState } from 'react';

import { useFormik } from 'formik';

import { Box, TextField, Typography, Container, Paper } from '@mui/material';

import useAccountId from '@/hooks/useAccountId';
import { useSnackbar } from '@/hooks/useSnackbar';
import useTransactionId from '@/hooks/useTransaction';
import { useAppDispatch, useAppSelector } from '@/hooks/utilityHooks';

import { MESSAGES, TransactionStatus, TransactionType } from '@/constant';
import { iMoneyTransaction } from '@/constant/interfaces';

import withTotalBalance from '@/hoc/withTotalBalance';

import SubmitResetButtons from '@/ui-kit/component/SubmitResetButtons';
import Pincode from '@/ui-kit/component/pincode';

import { getCurrentDateTimeISO } from '@/utils/dateUtils';
import { delay } from '@/utils/delay';

import { withdrawAmountAsyncThunk } from '@/redux/asyncThunk/withdrawAmount.asyncThunk';

import { withdrawalValidationSchema } from '@/validation/formValidation';


const Withdrawal: React.FC = () => {
  const accountId = useAccountId();
  const transactionId = useTransactionId();
  const [isPincodeVisible, setIsPincodeVisible] = useState(false);
  const balance = useAppSelector(state => state.balance);
  const totalBalance = balance?.data?.currentBalance;

  const { showSnackbar } = useSnackbar();
  const [values, setValues] = useState<iMoneyTransaction>();
  const dispatch = useAppDispatch();
  const [initialValues, setInitialValues] = useState<iMoneyTransaction>({
    type: TransactionType.Withdrawal,
    amount: 0,
    createdAt: getCurrentDateTimeISO(),
    status: TransactionStatus.Idle,
    transactionId,
    accountId,
  });

  const validationSchema = withdrawalValidationSchema(totalBalance || 0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async data => {
      if (data.amount) {
        setValues(data as iMoneyTransaction);
        setIsSubmitting(true);
        await delay(2000);
        setIsPincodeVisible(true);
      } else {
        showSnackbar(MESSAGES.error, MESSAGES.error);
      }
    },
  });

  const handlePincodeSubmit = () => {
    if (values) {
      showSnackbar(MESSAGES.pinVerified, MESSAGES.success);
      setTimeout(async () => {
        dispatch(withdrawAmountAsyncThunk(values));
        setIsPincodeVisible(false);
        setIsSubmitting(false);
        formik.resetForm();
        // Todo: The delay function is unnecessary here but here we have used it for showing the loader only.  
        await delay(500);
        showSnackbar(MESSAGES.withdrawSuccess, MESSAGES.success);
      }, 500);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        {!isPincodeVisible ? (
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
            sx={{ mt: 2 }}
          >
            <Typography variant="h4" component="h1" gutterBottom textAlign="center">
              Withdrawal Amount
            </Typography>

            <TextField
              disabled={isSubmitting}
              fullWidth
              id="amount"
              name="amount"
              label="Amount"
              type="number"
              value={formik.values.amount || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <Typography variant="body1" sx={{ mr: 1 }}>
                    $
                  </Typography>
                ),
              }}
            />

            <SubmitResetButtons isSubmitting={isSubmitting} />
          </Box>
        ) : (
          <Pincode onSubmit={handlePincodeSubmit} />
        )}
      </Paper>
    </Container>
  );
};

export default withTotalBalance(Withdrawal);
