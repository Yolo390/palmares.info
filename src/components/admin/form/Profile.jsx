"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import validator from "validator";

import TextField from "@mui/material/TextField";

import { Button } from "@/components/ui/Button";
import SnackbarMUI from "@/components/toast/Snackbar";

const schema = object({
  email: string()
    .required("Please enter your email adress.")
    .email("Invalid email adress !"),
  name: string()
    .required()
    .min(3, "Name should be between 3 to 16 characters.")
    .max(16, "Name should be between 3 to 16 characters."),
}).required();

const ProfileForm = ({ user }) => {
  const [err, setErr] = useState({});
  const [updated, setUpdated] = useState(Boolean(false));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { email, name } = data;

    // Use validator to avoid xss attacks.
    const safeData = {
      email: validator.escape(email),
      name: validator.escape(name),
    };

    try {
      const res = await fetch("/api/admin/profile/update", {
        body: JSON.stringify(safeData),
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
      });

      if (!res.ok) throw new Error("Failed to update user.");

      setUpdated(Boolean(true));
    } catch (error) {
      setErr({ message: error.message });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="h-full flex flex-col justify-center items-center gap-7"
    >
      <Controller
        name="email"
        control={control}
        defaultValue={user?.email || ""}
        render={({ field }) => (
          <TextField
            {...field}
            id="email"
            type="email"
            variant="standard"
            className="ml-[20px] mr-[20px]"
            label="Email"
            placeholder="Enter your email"
            autoComplete="off"
            helperText={errors.email ? errors.email?.message : ""}
            error={errors.email ? Boolean(true) : Boolean(false)}
            disabled
          />
        )}
      />

      <Controller
        name="name"
        control={control}
        defaultValue={user?.name || ""}
        render={({ field }) => (
          <TextField
            {...field}
            id="name"
            type="text"
            variant="standard"
            className="ml-[20px] mr-[20px]"
            label="Name"
            placeholder="Enter your Name"
            helperText={errors.name ? errors.name?.message : ""}
            error={errors.name ? Boolean(true) : Boolean(false)}
          />
        )}
      />

      <Button type="submit" variant="outline">
        Edit
      </Button>

      {updated && <SnackbarMUI setUpdated={setUpdated} type="success" />}
    </form>
  );
};

export default ProfileForm;
