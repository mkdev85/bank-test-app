import { TransactionStatus } from '@/constant';
import { iMoneyTransaction, iStatementsState } from '@/constant/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchStatements } from '../asyncThunk/fetchStatement.asyncThunk';

const initialState: iStatementsState = {
  isLoading: false,
  error: false,
  data: [],
};

const statementsSlice = createSlice({
  name: 'statements',
  initialState,
  reducers: {
    depositAmountAction: (state, action: PayloadAction<iMoneyTransaction>) => {
      state.data.push({ ...action.payload, status: TransactionStatus.Success });
    },
    withdrawalAmountAction: (state, action: PayloadAction<iMoneyTransaction>) => {
      state.data.push({ ...action.payload, status: TransactionStatus.Success });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchStatements.pending, state => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchStatements.fulfilled, (state, action: PayloadAction<iStatementsState>) => {
        state.isLoading = false;
        state.error = false;
        state.data = action.payload.data;
      })
      .addCase(fetchStatements.rejected, state => {
        state.isLoading = false;
        state.error = true;
      });
  },
});
export const { depositAmountAction, withdrawalAmountAction } = statementsSlice.actions;
export default statementsSlice.reducer;
