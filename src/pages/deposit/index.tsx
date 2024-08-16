import React, { useState } from 'react';
import { useFormik } from 'formik';

import { MESSAGES, TransactionStatus, TransactionType } from '@/constant';
import { iMoneyTransaction } from '@/constant/interfaces';

import { Container, Paper, Typography, Box, TextField } from '@mui/material';

import withTotalBalance from '@/hoc/withTotalBalance';

import useAccountId from '@/hooks/useAccountId';
import { useSnackbar } from '@/hooks/useSnackbar';
import useTransactionId from '@/hooks/useTransaction';
import { useAppDispatch } from '@/hooks/utilityHooks';

import { depositAmountAsyncThunk } from '@/redux/asyncThunk/depositAmount.asyncThunk';
import SubmitResetButtons from '@/ui-kit/component/SubmitResetButtons';

import { getCurrentDateTimeISO } from '@/utils/dateUtils';
import { delay } from '@/utils/delay';

import { depositValidationSchema } from '@/validation/formValidation';


const Deposit: React.FC = () => {
  const transactionId = useTransactionId();
  const accountId = useAccountId();
  const { showSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSuccess = () => {
    showSnackbar(MESSAGES.depositSuccess, MESSAGES.success);
  };

  const dispatch = useAppDispatch();
  const initialValues: iMoneyTransaction = {
    type: TransactionType.Deposit,
    amount: 0,
    createdAt: getCurrentDateTimeISO(),
    status: TransactionStatus.Idle,
    transactionId,
    accountId,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: depositValidationSchema,
    onSubmit: async values => {
      setIsSubmitting(true);

      try {
        await dispatch(depositAmountAsyncThunk({ ...values })).unwrap();
      } catch (error) {
        // Handle the error appropriately
      } finally {
        formik.resetForm();
        setIsSubmitting(false);
        // Todo: The delay function is unnecessary here but here we have used it for showing the loader only.  
        await delay(500);
        handleSuccess();
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          Deposit Amount
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          onReset={formik.handleReset}
          sx={{ mt: 2 }}
        >
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
            helperText={formik.touched.amount && (formik.errors.amount as string)} // Type assertion
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
      </Paper>
    </Container>
  );
};

export default withTotalBalance(Deposit);
