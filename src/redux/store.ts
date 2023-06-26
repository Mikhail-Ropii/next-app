import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
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
import { createWrapper } from "next-redux-wrapper";
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

const makeStore = () => {
  const store = configureStore({
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
  return store;
};

export const wrapper = createWrapper(makeStore);

export const persistor = persistStore(makeStore());
