import { ReactNode } from "react";

import SessionProvider from "@/context/nextAuth/SessionProvider";

import BottomNavbar from "@/components/backend/navbar/BottomNavbar";
import "@/styles/globals.css";

const BackendLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head />
      <SessionProvider>
        <body className="h-screen">
          {children}
          <BottomNavbar />
        </body>
      </SessionProvider>
    </html>
  );
};

export default BackendLayout;
