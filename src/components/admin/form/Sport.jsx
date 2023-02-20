"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import validator from "validator";

import TextField from "@mui/material/TextField";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import SnackbarMUI from "@/components/admin/toast/Snackbar";
import AdminError from "@/components/admin/error/AdminError.jsx";

const schema = object({
  name: string()
    .required("Please enter a name.")
    .min(3, "Name should be between 3 to 16 characters.")
    .max(16, "Name should be between 3 to 16 characters."),
  type: string().required("Please select a type").oneOf(["INDIVIDUAL", "TEAM"]),
}).required();

const SportForm = () => {
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
    const { name, type } = data;

    // Use validator to avoid xss attacks.
    const safeData = {
      name: validator.escape(name.toUpperCase()),
      type: validator.escape(type),
    };

    try {
      fetch("/api/admin/sport/addSport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(safeData),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            setErr({ message: res.error });
            return null;
          }

          setUpdated(Boolean(true));
        });
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
            placeholder="Enter a new sport"
            helperText={errors.name ? errors.name?.message : ""}
            error={errors.name ? Boolean(true) : Boolean(false)}
            autoComplete="off"
          />
        )}
      />

      <Controller
        name="type"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <div {...field} className="w-[323px]">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Type *" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"INDIVIDUAL"}>INDIVIDUAL</SelectItem>
                <SelectItem value={"TEAM"}>TEAM</SelectItem>
              </SelectContent>
            </Select>

            {errors?.type && (
              <span className="text-[#d32f2f] text-xs">
                {errors?.type?.message}
              </span>
            )}
          </div>
        )}
      />

      <Button type="submit" variant="outline">
        Add sport
      </Button>

      {updated && (
        <SnackbarMUI
          setUpdated={setUpdated}
          type="success"
          page="Sport"
          action="created"
        />
      )}

      {err?.message && <AdminError error={err} setError={setErr} />}
    </form>
  );
};

export default SportForm;
