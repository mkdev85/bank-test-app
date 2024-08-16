import { TransactionType } from '@/constant';
import { iBalanceResponse, iUpdateBalancePayload } from '@/constant/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchBalance } from '../asyncThunk/fetchBalance.asyncThunk';

const initialState: iBalanceResponse = {
  data: { currentBalance: 0, currency: '', accountId: '' },
  isLoading: false,
  error: false,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    updateBalanceOntype: (state, action: PayloadAction<iUpdateBalancePayload>) => {
      const { type, amount } = action.payload;
      if (state.data) {
        if (type === TransactionType.Deposit) {
          state.data.currentBalance += amount;
        } else if (type === TransactionType.Withdrawal) {
          state.data.currentBalance -= amount;
        }
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBalance.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchBalance.fulfilled, (state, action: PayloadAction<iBalanceResponse>) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.error = false;
      })
      .addCase(fetchBalance.rejected, state => {
        state.isLoading = false;
      });
  },
});

export const { updateBalanceOntype } = balanceSlice.actions;
export default balanceSlice.reducer;
