import { ReactNode } from "react";

import SessionProvider from "@/context/nextAuth/SessionProvider";
import LocalizationProvider from "@/context/datePickersMUI/LocalizationProvider";

import BottomMenuBar from "@/components/admin/navbar/BottomMenuBar";

import "@/styles/globals.css";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head />
      <SessionProvider>
        <LocalizationProvider>
          <body className="h-screen">
            {children}
            <BottomMenuBar />
          </body>
        </LocalizationProvider>
      </SessionProvider>
    </html>
  );
};

export default AdminLayout;
