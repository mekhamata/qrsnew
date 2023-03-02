import { createSlice, current } from "@reduxjs/toolkit";
const axios = require("axios");
const API_URL = "https://qrs-global.com/react/general/index.php";
// create a slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        // itemInCart.qty++;
        itemInCart.qty = itemInCart.qty + action.payload.qty;
      } else {
        // state.cart.push({ ...action.payload, qty: 1 });
        state.cart.push(action.payload);
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.qty++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.qty === 1) {
        item.qty = 1;
      } else {
        item.qty--;
      }
    },
    setQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      item.qty = action.payload.qty;
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload
      );
      state.cart = removeItem;
    },
    emptyCart: (state, action) => {
      state.cart = [];
    },
  },
});
export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  setQuantity,
  removeItem,
  emptyCart,
} = cartSlice.actions;
