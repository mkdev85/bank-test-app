import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import rootReducers from '../redux/slice';

export const store = configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = ReturnType<typeof store | any>;
export type AppPersistor = ReturnType<typeof persistor | any>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStore,
  unknown,
  Action<string>
>;
