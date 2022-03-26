import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import products from "./productsSlice";

export const store = configureStore({
  reducer: {
    auth,
    products,
  },
});
