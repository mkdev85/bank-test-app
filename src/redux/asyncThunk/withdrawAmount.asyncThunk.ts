import { createAsyncThunk } from '@reduxjs/toolkit';

import { TransactionType } from '@/constant';
import { iMoneyTransaction } from '@/constant/interfaces';

import Account from '../servises/account';

import { updateBalanceOntype } from '../slice/balanceSlice';
import { withdrawalAmountAction } from '../slice/statementsSlice';

export const withdrawAmountAsyncThunk = createAsyncThunk(
  'withdrawal/withdrawAmount',
  async (payload: iMoneyTransaction, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      await Account.withdrawAmount();
      dispatch(withdrawalAmountAction(payload));
      dispatch(updateBalanceOntype({ type: TransactionType.Withdrawal, amount: payload.amount }));
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
