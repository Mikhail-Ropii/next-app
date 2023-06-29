"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import { persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
