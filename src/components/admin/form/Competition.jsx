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
import AdminError from "@/components/admin/error/AdminError.jsx";

const getSports = () => {
  const { data } = useGetSports();

  const sports = data?.sports;

  return sports;
};

const schema = object({
  name: string()
    .required("Please enter a competition name.")
    .min(2, "Name should be between 2 to 22 characters.")
    .max(22, "Name should be between 2 to 22 characters."),
  nickname: string().optional("Nickname is not required."),
  creationDate: date("Invalid date").required("Please enter a creation date."),
  sport: string().required("Please select a sport"),
}).required();

const CompetitionForm = () => {
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
    const { name, nickname, creationDate, sport } = data;

    // Use validator to avoid xss attacks.
    const safeData = {
      name: validator.escape(name),
      nickname: validator.escape(nickname),
      creationDate,
      sportId: sport,
    };

    try {
      fetch("/api/admin/competition/addCompetition", {
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
            className="ml-5 mr-5"
            label="Competition name *"
            placeholder="Enter a new competition name"
            helperText={errors?.name ? errors?.name?.message : ""}
            error={errors?.name ? Boolean(true) : Boolean(false)}
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
        name="creationDate"
        control={control}
        defaultValue={""}
        render={({ field }) => (
          <MobileDatePicker
            {...field}
            reduceAnimations
            label="Creation date *"
            toolbarPlaceholder="Pick a date"
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                className="ml-5 mr-5"
                placeholder="Enter a creation date"
                helperText={
                  errors?.creationDate ? errors?.creationDate?.message : ""
                }
                error={errors?.creationDate ? Boolean(true) : Boolean(false)}
              />
            )}
          />
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

      <Button type="submit" variant="outline">
        Add competition
      </Button>

      {updated && (
        <SnackbarMUI
          setUpdated={setUpdated}
          type="success"
          page="Competition"
          action="created"
        />
      )}

      {err?.message && <AdminError error={err} setError={setErr} />}
    </form>
  );
};

export default CompetitionForm;
