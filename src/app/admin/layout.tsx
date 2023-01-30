import { ReactNode } from "react";

import SessionProvider from "@/context/nextAuth/SessionProvider";

import BottomMenuBar from "@/components/admin/navbar/BottomMenuBar";
import "@/styles/globals.css";

const AdminLayout = ({ children }: { children: ReactNode }) => {
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

export default AdminLayout;
