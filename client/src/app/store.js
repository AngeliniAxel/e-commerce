import { configureStore } from '@reduxjs/toolkit';
import productsSlice from '../slices/productsSlice';
import userSlice from '../slices/userSlice';

export const store = configureStore({
  reducer: {
    products: productsSlice,
    user: userSlice,
  },
});
