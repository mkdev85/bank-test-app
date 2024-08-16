import { iSendMoneyTransaction } from '@/constant/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface iSentMoneyState {
  data: iSendMoneyTransaction[];
}

const initialState: iSentMoneyState = {
  data: [],
};

const sendMoneySlice = createSlice({
  name: 'sentMoney',
  initialState,
  reducers: {
    sendMoneyAction: (state, action: PayloadAction<iSendMoneyTransaction>) => {
      state.data.push(action.payload);
    },
  },
});

export const { sendMoneyAction } = sendMoneySlice.actions;

export default sendMoneySlice.reducer;
