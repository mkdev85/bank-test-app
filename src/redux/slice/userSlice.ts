import { iUserState } from '@/constant/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchUserData } from '../asyncThunk/fetchUserData.asyncThunk';

const initialState: iUserState = {
  isLoading: false,
  error: false,
  data: {
    id: '',
    name: '',
    email: '',
    accountId: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserData.pending, state => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload.user.data;
        state.error = false;
      })
      .addCase(fetchUserData.rejected, state => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default userSlice.reducer;
