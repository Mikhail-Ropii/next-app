import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// import { storage } from "./storage";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { cartSlice } from "./cartReducer";
import { shopsAPI } from "./shopsAPI";
import { ordersAPI } from "./ordersAPI";

const cartPersistConfig = {
  key: "root",
  storage,
};

const persistedCartReducer = persistReducer(
  cartPersistConfig,
  cartSlice.reducer
);

export const store = configureStore({
  reducer: {
    [shopsAPI.reducerPath]: shopsAPI.reducer,
    [ordersAPI.reducerPath]: ordersAPI.reducer,
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(shopsAPI.middleware)
      .concat(ordersAPI.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
