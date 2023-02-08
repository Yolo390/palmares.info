"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { date, object, string } from "yup";
import validator from "validator";

import useGetSports from "@/utils/swr/getSports";

import TextField from "@mui/material/TextField";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import SnackbarMUI from "@/components/admin/toast/Snackbar";

const schema = object({
  firstname: string()
    .required("Please enter a firstname.")
    .min(2, "Firstname should be between 2 to 22 characters.")
    .max(22, "Firstname should be between 2 to 22 characters."),
  lastname: string()
    .required("Please enter a lastname.")
    .min(2, "Lastname should be between 2 to 22 characters.")
    .max(22, "Lastname should be between 2 to 22 characters."),
  nickname: string()
    .optional("Nickname is not required.")
    .min(1, "Nickname should be between 1 to 22 characters.")
    .max(22, "Lastname should be between 1 to 22 characters."),
  birthdate: date("Invalid date").required("Please enter a birthdate."),
}).required();

const AthleteForm = () => {
  const [err, setErr] = useState({});
  const [updated, setUpdated] = useState(Boolean(false));

  const { data } = useGetSports();
  const sports = data?.sports;

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
      // create new athlete through API.

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
        name="firstname"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <TextField
            {...field}
            id="firstname"
            type="text"
            variant="standard"
            className="ml-5 mr-5"
            label="Firstname"
            placeholder="Enter a new firstname"
            required
            helperText={errors.firstname ? errors.firstname?.message : ""}
            error={errors.firstname ? Boolean(true) : Boolean(false)}
          />
        )}
      />

      <Controller
        name="lastname"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <TextField
            {...field}
            id="lastname"
            type="text"
            variant="standard"
            className="ml-5 mr-5"
            label="Lastname"
            placeholder="Enter a new lastname"
            required
            helperText={errors.lastname ? errors.lastname?.message : ""}
            error={errors.lastname ? Boolean(true) : Boolean(false)}
          />
        )}
      />

      <Controller
        name="nickname"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <TextField
            {...field}
            id="nickname"
            type="text"
            variant="standard"
            className="ml-5 mr-5"
            label="Nickname"
            placeholder="Enter a new nickname"
            helperText={errors.nickname ? errors.nickname?.message : ""}
            error={errors.nickname ? Boolean(true) : Boolean(false)}
          />
        )}
      />

      <Controller
        name="birthdate"
        control={control}
        defaultValue={new Date()}
        render={({ field }) => (
          <MobileDatePicker
            {...field}
            disableFuture
            reduceAnimations
            label="Birthdate"
            toolbarPlaceholder="Pick a date"
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                className="ml-5 mr-5"
                placeholder="Enter a birthdate"
                required
                helperText={errors.birthdate ? errors.birthdate?.message : ""}
                error={errors.birthdate ? Boolean(true) : Boolean(false)}
              />
            )}
          />
        )}
      />

      <Controller
        name="sports"
        control={control}
        defaultValue={"-"}
        render={({ field }) => (
          <div {...field} className="w-[323px]">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sports" />
              </SelectTrigger>
              <SelectContent>
                {sports &&
                  sports.map((sport) => (
                    <SelectItem key={sport.id} value={sport.name}>
                      {sport.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        )}
      />

      <Controller
        name="titles"
        control={control}
        defaultValue={"-"}
        render={({ field }) => (
          <div {...field} className="w-[323px]">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Titles" />
              </SelectTrigger>
              <SelectContent></SelectContent>
            </Select>
          </div>
        )}
      />

      <Button type="submit" variant="outline">
        Add athlete
      </Button>

      {updated && <SnackbarMUI setUpdated={setUpdated} type="success" />}
    </form>
  );
};

export default AthleteForm;
