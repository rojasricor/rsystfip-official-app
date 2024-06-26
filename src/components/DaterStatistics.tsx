"use client";

import type { AppointmentStatus } from "@/enums";
import {
  setQueryData,
  type QueryData,
} from "@/redux/features/statistics/statisticsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format, parse } from "date-fns";
import { useTranslations } from "next-intl";
import { memo } from "react";

interface IProps {
  appointment_status: AppointmentStatus;
}

function DaterStatistics({ appointment_status }: IProps): React.ReactNode {
  const t = useTranslations("Statistics");

  const dispatch = useAppDispatch();

  const queryDataState: QueryData = useAppSelector(
    ({ statistics }) => statistics[appointment_status].queryData
  );

  const handleChangeSelect = (e: SelectChangeEvent) => {
    dispatch(
      setQueryData([
        appointment_status,
        {
          ...queryDataState,
          [e.target.name]: e.target.value,
        },
      ])
    );
  };

  const handleChangeDatePicker = (name: string, value: Date) => {
    dispatch(
      setQueryData([
        appointment_status,
        {
          ...queryDataState,
          [name]: format(value, "yyyy-MM-dd"),
        },
      ])
    );
  };

  return (
    <Grid
      container
      spacing={2}
      marginY={{ xs: "1rem", sm: "2rem", md: "3rem" }}
      alignItems="center"
    >
      <Grid item>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={t("start")}
            value={parse(queryDataState.start_time, "yyyy-MM-dd", new Date())}
            onChange={(value) => {
              handleChangeDatePicker("start_time", value!);
            }}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={t("end")}
            value={parse(queryDataState.end_time, "yyyy-MM-dd", new Date())}
            onChange={(value) => {
              handleChangeDatePicker("end_time", value!);
            }}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>{t("chart")}</InputLabel>

          <Select
            name="chart_type"
            label={t("chart")}
            value={queryDataState.chart_type}
            onChange={handleChangeSelect}
            autoFocus
          >
            {queryDataState.chart_types.map((chart_type) => (
              <MenuItem key={crypto.randomUUID()} value={chart_type}>
                {chart_type[0].toUpperCase().concat(chart_type.slice(1))}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default memo(DaterStatistics);
