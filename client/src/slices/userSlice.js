import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    cart: [
      {
        id: 2,
        name: 'T-shirt',
        style: 'crewneck',
        color: 'pink',
        img: 'T_SHIRT_PINK',
        price: '12',
        quantity: 2,
      },
      {
        id: 7,
        name: 'T-Jacket',
        style: 'bomber',
        color: 'blue',
        img: 'JACKET_BLUE',
        price: '60',
        quantity: 1,
      },
    ],
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
