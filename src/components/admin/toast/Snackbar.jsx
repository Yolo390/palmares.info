"use client";

import { forwardRef, useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarMUI = ({ setUpdated, type = "success", page, status }) => {
  const [open, setOpen] = useState(Boolean(true));

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(Boolean(false));
    setUpdated(Boolean(false));
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {page} successfully {status} !
      </Alert>
    </Snackbar>
  );
};

export default SnackbarMUI;
