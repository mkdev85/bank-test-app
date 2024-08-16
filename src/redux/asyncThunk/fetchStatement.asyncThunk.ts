import { createAsyncThunk } from '@reduxjs/toolkit';

import Account from '../servises/account';

export const fetchStatements = createAsyncThunk(
  'statements/fetchStatements',
  async (_, { rejectWithValue }) => {
    try {
      const data = Account.getAccountStatement();
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
