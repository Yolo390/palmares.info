import { ReactNode } from "react";

import SessionProvider from "@/context/nextAuth/SessionProvider";

import BottomMenuBar from "@/components/backend/navbar/BottomMenuBar";
import "@/styles/globals.css";

const BackendLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head />
      <SessionProvider>
        <body className="h-screen">
          {children}
          <BottomMenuBar />
        </body>
      </SessionProvider>
    </html>
  );
};

export default BackendLayout;
