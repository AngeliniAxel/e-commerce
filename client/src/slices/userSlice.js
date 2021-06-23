import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    cart: [],
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const selectUserData = (state) => state.user.userData;
export const selectCart = (state) => state.user.cart;
export const { setUserData, setCart } = userSlice.actions;
export default userSlice.reducer;
