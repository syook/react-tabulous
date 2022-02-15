import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import tabulousSlice from './tabulous-slice';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: { tabulous: tabulousSlice.reducer },
  middleware: customizedMiddleware,
});

export default store;
