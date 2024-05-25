import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import quoteReducer from "./features/quoteSlice";
import utilityReducer from "./features/utilitySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    quote: quoteReducer,
    utility: utilityReducer,
  },
});
