import { configureStore } from "@reduxjs/toolkit";
import paymentSlice from "./redux/payment-api-slice";
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, paymentSlice)
export const store = configureStore({
  reducer: {
    payment: persistedReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger);
  }
});

export const persistor = persistStore(store)
