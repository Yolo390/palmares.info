"use client";

import { ReactNode } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "dayjs/locale/fr";
import "dayjs/locale/en";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"fr"}>
      {children}
    </LocalizationProvider>
  );
};

export default Provider;
