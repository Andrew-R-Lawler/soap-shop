import { configureStore } from "@reduxjs/toolkit";
import paymentSlice from "./redux/payment-api-slice";
import logger from 'redux-logger';

// creates react-redux store and adds redux-logger to middleware
export default configureStore({
  reducer: {
    payment: paymentSlice
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger);
  }
});


