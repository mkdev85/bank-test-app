import { createAsyncThunk } from '@reduxjs/toolkit';

import { TransactionType } from '@/constant';
import { iSendMoneyTransaction } from '@/constant/interfaces';

import { updateBalanceOntype } from '../slice/balanceSlice';
import { sendMoneyAction } from '../slice/sendMoneySlice';
import { withdrawalAmountAction } from '../slice/statementsSlice';

import Account from '../servises/account';

export const sendMoneyAsyncThunk = createAsyncThunk(
  'withdrawal/withdrawAmount',
  async (payload: iSendMoneyTransaction, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      await Account.sendMoney();

      dispatch(updateBalanceOntype({ type: TransactionType.Withdrawal, amount: payload.amount }));
      dispatch(withdrawalAmountAction(payload));
      dispatch(sendMoneyAction(payload));
    } catch (err) {
      // If an error occurs during the API call, reject the thunk with the error.
      return rejectWithValue(err);
    }
  },
);
