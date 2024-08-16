import { createAsyncThunk } from '@reduxjs/toolkit';

import Account from '../servises/account';

export const fetchBalance = createAsyncThunk(
  'user/fetchBalance',
  async (_, { rejectWithValue }) => {
    try {
      const data = await Account.getBalance();
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
