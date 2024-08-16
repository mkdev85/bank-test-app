import React, { useCallback, useEffect, useState } from 'react';

import { Box, TextField, Typography, Container, Paper } from '@mui/material';
import { useFormik } from 'formik';

import { MESSAGES, TransactionStatus, TransactionType } from '@/constant';
import { iSendMoneyTransaction } from '@/constant/interfaces';

import withTotalBalance from '@/hoc/withTotalBalance';

import useAccountId from '@/hooks/useAccountId';
import { useSnackbar } from '@/hooks/useSnackbar';
import useTransactionId from '@/hooks/useTransaction';
import { useAppDispatch, useAppSelector } from '@/hooks/utilityHooks';

import { sendMoneyAsyncThunk } from '@/redux/asyncThunk/sendMoney.asynThunk';
import SubmitResetButtons from '@/ui-kit/component/SubmitResetButtons';
import Pincode from '@/ui-kit/component/pincode';

import { getCurrentDateTimeISO } from '@/utils/dateUtils';
import { delay } from '@/utils/delay';

import { sendMoneyValidation } from '@/validation/formValidation';

import RecentPayees from './recentPayees';

const SendMoney: React.FC = () => {
  const transactionId = useTransactionId();
  const accountId = useAccountId();
  const [isPincodeVisible, setIsPincodeVisible] = useState(false);
  const { showSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const balance = useAppSelector(state => state.balance);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [totalBalance, setTotalBalance] = useState<number>(0);

  useEffect(() => {
    setTotalBalance(balance?.data.currentBalance);
  }, [balance]);

  const [initialValues, setInitialValues] = useState<iSendMoneyTransaction>({
    type: TransactionType.SendMoney,
    recipientAccountId: '',
    amount: 0,
    createdAt: getCurrentDateTimeISO(),
    status: TransactionStatus.Idle,
    transactionId,
    accountId,
  });

  const validationSchema = sendMoneyValidation(totalBalance || 0);
  const [values, setValues] = useState<any>();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async data => {
      setValues(data as iSendMoneyTransaction);
      setIsSubmitting(true);
      await delay(2000);
      setIsPincodeVisible(true);
    },
  });

  const handlePincodeSubmit = () => {
    showSnackbar(MESSAGES.pinVerified, MESSAGES.success);
    setTimeout(async () => {
      dispatch(sendMoneyAsyncThunk(values));
      setIsPincodeVisible(false);
      setIsSubmitting(false);
      formik.resetForm();
      // Todo: The delay function is unnecessary here but here we have used it for showing the loader only.  
      await delay(500);
      showSnackbar(MESSAGES.sendMoneySuccess, MESSAGES.success);
    }, 500);
  };

  const handleListItemClick = useCallback(
    (accountNo: string) => {
      formik.setFieldValue('accountNo', accountNo);
    },
    [formik],
  );

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
              Send Money
            </Typography>

            <TextField
              disabled={isSubmitting}
              fullWidth
              placeholder="e.g., DE89 3704 0044 0532 0130 00"
              id="recipientAccountId"
              name="recipientAccountId"
              label="Account Number (IBAN)"
              value={formik.values.recipientAccountId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.recipientAccountId && Boolean(formik.errors.recipientAccountId)}
              helperText={formik.touched.recipientAccountId && formik.errors.recipientAccountId}
              sx={{ mb: 2 }}
            />

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
      {!isPincodeVisible && <RecentPayees handleListItemClick={handleListItemClick} />}
    </Container>
  );
};

export default withTotalBalance(SendMoney);
