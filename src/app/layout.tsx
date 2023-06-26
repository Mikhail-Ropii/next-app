"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { connect } from "@/utils/mongodb";
import { persistor, wrapper } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Delivery",
  description: "Delivery App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { store } = wrapper.useWrappedStore(children);
  connect();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </PersistGate>
    </Provider>
  );
}
