import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import paymentSlice from "./redux/payment-api-slice";

export default configureStore({
  reducer: {
    payment: paymentSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
  }
});
