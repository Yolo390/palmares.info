"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { date, object, string } from "yup";
import validator from "validator";

import TextField from "@mui/material/TextField";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import useGetSports from "@/utils/swr/getSports";
import useGetCompetitionsBySport from "@/utils/swr/getCompetitionsBySport";

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

const getCompetitionsBySport = (sport) => {
  const { data } = useGetCompetitionsBySport(sport);

  const competitions = data?.competitions;

  return competitions;
};

const schema = object({
  date: date("Invalid date").required("Please enter a date."),
  competition: string().required("Please select a competition."),
}).required();

const TitleForm = () => {
  const [err, setErr] = useState({});
  const [updated, setUpdated] = useState(Boolean(false));
  const [displayCompetition, setDisplayCompetition] = useState(Boolean(false));
  const [competitions, setCompetitions] = useState([]);

  const sports = getSports();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const watchSport = watch("sport");

  useEffect(() => {
    if (watchSport) {
      fetch(`/api/admin/competition/getCompetitionsBySport?sport=${watchSport}`)
        .then((res) => res.json())
        .then((res) => {
          setCompetitions(res.competitions);
          setDisplayCompetition(Boolean(true));
        });
    }
  }, [watchSport]);

  const onSubmit = async (data) => {
    const { date, competition } = data;

    // Use validator to avoid xss attacks.
    const safeData = {
      date,
      competitionId: validator.escape(competition),
    };

    console.log("safeData: ", safeData);

    try {
      fetch("/api/admin/title/addTitle", {
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
        name="date"
        control={control}
        defaultValue={new Date()}
        render={({ field }) => (
          <MobileDatePicker
            {...field}
            reduceAnimations
            label="Date *"
            toolbarPlaceholder="Pick a date"
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                className="ml-5 mr-5"
                placeholder="Enter a date"
                helperText={errors?.date ? errors?.date?.message : ""}
                error={errors?.date ? Boolean(true) : Boolean(false)}
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

      {displayCompetition && (
        <Controller
          name="competition"
          control={control}
          defaultValue={""}
          render={({ field }) => (
            <div {...field} className="w-[323px]">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Competition *" />
                </SelectTrigger>
                <SelectContent>
                  {competitions &&
                    competitions.map((competition) => (
                      <SelectItem key={competition.id} value={competition.id}>
                        {competition.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              {errors?.competition && (
                <span className="text-[#d32f2f] text-xs">
                  {errors?.competition?.message}
                </span>
              )}
            </div>
          )}
        />
      )}

      <Button type="submit" variant="outline">
        Add title
      </Button>

      {updated && (
        <SnackbarMUI
          setUpdated={setUpdated}
          type="success"
          page="Title"
          action="created"
        />
      )}

      {err?.message && <AdminError error={err} setError={setErr} />}
    </form>
  );
};

export default TitleForm;
