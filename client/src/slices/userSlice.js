import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async () => {
    const data = await fetch('/auth/login/success', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*',
      },
    }).then((response) => {
      if (response.status === 200) return response.json();
      else {
        return null;
      }
    });
    return data.user;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    status: '',
    userData: null,
    cart: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
  extraReducers: {
    [fetchUserData.pending]: (state, action) => {
      state.status = 'pending';
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.userData = action.payload;
    },
    [fetchUserData.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export const selectUserData = (state) => state.user.userData;
export const selectCart = (state) => state.user.cart;
export const selectUserStatus = (state) => state.user.status;
export const { setCart } = userSlice.actions;
export default userSlice.reducer;
