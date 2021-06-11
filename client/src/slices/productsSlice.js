import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const products = await axios.get('/api');
    return products;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    filter: 'all',
    list: [],
    status: '',
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.status = 'pending';
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.list = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export const selectProductsList = (state) => state.products.list;
export const selectProductsFilter = (state) => state.products.filter;
export const selectProductsStatus = (state) => state.products.status;
export const { setFilter } = productsSlice.actions;
export default productsSlice.reducer;
