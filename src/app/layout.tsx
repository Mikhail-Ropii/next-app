import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/redux/provider";
import { Layout } from "@/components/layout/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Food Delivery",
  description: "Delivery App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Layout />
          {children}
        </Providers>
      </body>
    </html>
  );
}
