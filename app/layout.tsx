// "use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Provider from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DoShare",
  description: "Social App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#242424] text-white">
      <body className={inter.className}>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
