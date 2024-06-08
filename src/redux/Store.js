import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./features/api/baseApi";
import authReducer from "../redux/features/auth/authSlice";
import orderLogReducer from "../redux/features/OrderLog/orderLogSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
};

const orderLogPersistConfig = {
  key: "orderLog",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedOrderLogReducer = persistReducer(
  orderLogPersistConfig,
  orderLogReducer
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    orderLog: persistedOrderLogReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
