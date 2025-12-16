import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    count: 0,
  },
  reducers: {
    setCartCount(state, action) {
      state.count = action.payload;
    },
    clearCartCount(state) {
      state.count = 0;
    },
  },
});

export const { setCartCount, clearCartCount } = cartSlice.actions;
export const selectCartCount = (state) => state.cart.count;

export default cartSlice.reducer;
