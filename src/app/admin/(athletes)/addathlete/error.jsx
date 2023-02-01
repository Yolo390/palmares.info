"use client";

import AdminError from "@/components/admin/error/AdminError.jsx";

const Error = ({ error, reset }) => {
  return <AdminError error={error} reset={reset} />;
};

export default Error;
