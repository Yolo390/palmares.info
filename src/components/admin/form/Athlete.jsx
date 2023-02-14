"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { date, object, string } from "yup";
import validator from "validator";
import clsx from "clsx";

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
import AdminError from "@/components/admin/error/AdminError.jsx";

const getSports = () => {
  const { data } = useGetSports();

  const sports = data?.sports;

  return sports;
};

const schema = object({
  firstname: string()
    .required("Please enter a firstname.")
    .min(2, "Firstname should be between 2 to 22 characters.")
    .max(22, "Firstname should be between 2 to 22 characters."),
  lastname: string()
    .required("Please enter a lastname.")
    .min(2, "Lastname should be between 2 to 22 characters.")
    .max(22, "Lastname should be between 2 to 22 characters."),
  nickname: string().optional("Nickname is not required."),
  birthdate: date("Invalid date").required("Please enter a birthdate."),
  birthplace: string().required("Please enter a birthplace."),
  gender: string().required("Please select a gender").oneOf(["MAN", "WOMAN"]),
  sport: string().required("Please select a sport"),
  // sport: string().required("Please select a sport").oneOf(getSports), // validate ID's
}).required();

const AthleteForm = () => {
  const [err, setErr] = useState({});
  const [updated, setUpdated] = useState(Boolean(false));

  const sports = getSports();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const {
      firstname,
      lastname,
      nickname,
      birthdate,
      birthplace,
      gender,
      sport,
      titles,
    } = data;

    // Use validator to avoid xss attacks.
    const safeData = {
      firstname: validator.escape(firstname),
      lastname: validator.escape(lastname),
      nickname: validator.escape(nickname),
      gender: validator.escape(gender),
      birthdate,
      birthplace: validator.escape(birthplace),
      sportId: sport,
      titles,
    };

    try {
      fetch("/api/admin/athlete/addAthlete", {
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
      className={clsx(
        "h-full flex flex-col justify-center items-center gap-7",
        "mt-14 mb-20 sm:mt-0 sm:mb-0"
      )}
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
            label="Firstname *"
            placeholder="Enter a new firstname"
            helperText={errors?.firstname ? errors?.firstname?.message : ""}
            error={errors?.firstname ? Boolean(true) : Boolean(false)}
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
            label="Lastname *"
            placeholder="Enter a new lastname"
            helperText={errors?.lastname ? errors?.lastname?.message : ""}
            error={errors?.lastname ? Boolean(true) : Boolean(false)}
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
            helperText={errors?.nickname ? errors?.nickname?.message : ""}
            error={errors?.nickname ? Boolean(true) : Boolean(false)}
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
            label="Birthdate *"
            toolbarPlaceholder="Pick a date"
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                className="ml-5 mr-5"
                placeholder="Enter a birthdate"
                helperText={errors?.birthdate ? errors?.birthdate?.message : ""}
                error={errors?.birthdate ? Boolean(true) : Boolean(false)}
              />
            )}
          />
        )}
      />

      <Controller
        name="birthplace"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <TextField
            {...field}
            id="birthplace"
            type="text"
            variant="standard"
            className="ml-5 mr-5"
            label="Birthplace *"
            placeholder="Enter a new birthplace"
            helperText={errors?.birthplace ? errors?.birthplace?.message : ""}
            error={errors?.birthplace ? Boolean(true) : Boolean(false)}
          />
        )}
      />

      <Controller
        name="gender"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <div {...field} className="w-[323px]">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Gender *" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"MAN"}>MAN</SelectItem>
                <SelectItem value={"WOMAN"}>WOMAN</SelectItem>
              </SelectContent>
            </Select>

            {errors?.gender && (
              <span className="text-[#d32f2f] text-xs">
                {errors?.gender?.message}
              </span>
            )}
          </div>
        )}
      />

      <Controller
        name="sport"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <div {...field} className="w-[323px]">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Sport *" />
              </SelectTrigger>
              <SelectContent>
                {sports &&
                  sports.map((sport) => (
                    <SelectItem key={sport.id} value={sport.id}>
                      {sport.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            {errors?.sport && (
              <span className="text-[#d32f2f] text-xs">
                {errors?.sport?.message}
              </span>
            )}
          </div>
        )}
      />

      <Controller
        name="titles"
        control={control}
        defaultValue={[]}
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

      {updated && (
        <SnackbarMUI
          setUpdated={setUpdated}
          type="success"
          page="Athlete"
          action="created"
        />
      )}

      {err?.message && <AdminError error={err} setError={setErr} />}
    </form>
  );
};

export default AthleteForm;
