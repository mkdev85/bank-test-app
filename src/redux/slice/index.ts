import { combineReducers } from '@reduxjs/toolkit';

import balanceSlice from './balanceSlice';
import sendMoneySlice from './sendMoneySlice';
import statementsSlice from './statementsSlice';
import userSlice from './userSlice';

export default combineReducers({
  user: userSlice,
  balance: balanceSlice,
  statements: statementsSlice,
  sendMoney: sendMoneySlice,
});
