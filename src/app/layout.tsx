import { ReactNode } from "react";

import SessionProvider from "@/context/nextAuth/SessionProvider";

import "@/styles/globals.css";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head />
      <SessionProvider>
        <body className="h-screen">{children}</body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
