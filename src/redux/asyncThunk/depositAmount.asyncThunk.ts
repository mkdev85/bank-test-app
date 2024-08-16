import { createAsyncThunk } from '@reduxjs/toolkit';

import { TransactionType } from '@/constant';
import { iMoneyTransaction } from '@/constant/interfaces';

import { delay } from '@/utils/delay';
import Account from '../servises/account';

import { updateBalanceOntype } from '../slice/balanceSlice';
import { depositAmountAction } from '../slice/statementsSlice';

export const depositAmountAsyncThunk = createAsyncThunk(
  'deposit/DepositAmount',
  async (payload: iMoneyTransaction, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const data = await Account.depositAmount();
      await delay(2000);
      dispatch(depositAmountAction(payload));
      dispatch(updateBalanceOntype({ type: TransactionType.Deposit, amount: payload.amount || 0 }));
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
