import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import quoteReducer from "./features/quoteSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    quote: quoteReducer,
  },
});
