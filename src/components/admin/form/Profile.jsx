"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import validator from "validator";

import TextField from "@mui/material/TextField";

import { Button } from "@/components/ui/Button";

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
  const [error, setError] = useState({});

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { email, name } = data;

    console.log("email: ", email);

    // Use validator to avoid xss attacks.
    const safeData = {
      email: validator.escape(email),
      name: validator.escape(name),
    };

    try {
      // TODO:
      // submit to backend
      const res = await useUpdateUserById(safeData);

      if (res.error) throw new Error(res.error.message);
    } catch (error) {
      setError({ message: error.message });
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
        defaultValue={user.email || ""}
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
          />
        )}
      />

      <Controller
        name="name"
        control={control}
        defaultValue={user.name || ""}
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
    </form>
  );
};

export default ProfileForm;