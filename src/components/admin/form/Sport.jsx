"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import validator from "validator";

import TextField from "@mui/material/TextField";

import { Button } from "@/components/ui/Button";
import SnackbarMUI from "@/components/admin/toast/Snackbar";

const schema = object({
  name: string()
    .required()
    .min(3, "Name should be between 3 to 16 characters.")
    .max(16, "Name should be between 3 to 16 characters."),
}).required();

const SportForm = ({ user }) => {
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
    console.log("frontend data: ", data);

    try {
      // TODO:
      // create new sport through API.

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
        name="name"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <TextField
            {...field}
            id="name"
            type="text"
            variant="standard"
            className="ml-[20px] mr-[20px]"
            label="Name"
            placeholder="Enter a new name"
            helperText={errors.name ? errors.name?.message : ""}
            error={errors.name ? Boolean(true) : Boolean(false)}
          />
        )}
      />

      <Button type="submit" variant="outline">
        Add
      </Button>

      {updated && <SnackbarMUI setUpdated={setUpdated} type="success" />}
    </form>
  );
};

export default SportForm;
