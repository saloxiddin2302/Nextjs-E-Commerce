import { configureStore } from "@reduxjs/toolkit";
import authReducer, { name as authName } from "../slice/authSlice";

export const store = configureStore({
  reducer: {
    [authName]: authReducer,
  },
});
