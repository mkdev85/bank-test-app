import { createAsyncThunk } from '@reduxjs/toolkit';

import User from '../servises/user';

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      const data = User.getUserDetails();
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
