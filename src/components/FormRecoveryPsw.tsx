"use client";

import { notify } from "@/libs/notify";
import { accountService } from "@/services";
import type { THandleChangeI, THandleSubmit } from "@/types";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import MailIcon from "@mui/icons-material/Mail";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { green } from "@mui/material/colors";
import { isAxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useMutation } from "react-query";

function FormRecoveryPsw(): React.ReactNode {
  const t = useTranslations("PageRecoverPassword");

  const formDataInitialState = { email: "" };
  const [formData, setFormData] = useState(formDataInitialState);

  const { mutate, isLoading, isSuccess, isError } = useMutation(
    accountService.sendJwtForRecoverPsw,
    {
      onSuccess() {
        notify(
          `We will send you an email with instructions to reset your password. The link sended expires in 3 minutes.`,
          { type: "success" }
        );

        setFormData(formDataInitialState);
      },
      onError(error) {
        if (isAxiosError(error)) {
          notify(error.response?.data.error, { type: "error" });
        }
      },
    }
  );

  const handleSubmit = (e: THandleSubmit) => {
    e.preventDefault();
    const payload = formData;
    mutate(payload.email);
  };

  const handleChange = (e: THandleChangeI) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        required
        fullWidth
        name="email"
        placeholder={t("placeholder")}
        onChange={handleChange}
        value={formData.email}
        type="email"
        autoComplete="off"
        spellCheck={false}
        inputProps={{ minLength: 10, maxLength: 30 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailIcon sx={{ mx: 2 }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end" sx={{ my: 5 }}>
              <Box sx={{ position: "relative" }}>
                <Tooltip title={t("submit")}>
                  <Fab
                    color={`${
                      isSuccess ? "success" : isError ? "error" : "primary"
                    }`}
                    type="submit"
                  >
                    {isSuccess ? (
                      <CheckIcon />
                    ) : isError ? (
                      <ErrorIcon />
                    ) : (
                      <MailIcon />
                    )}
                  </Fab>
                </Tooltip>

                {isLoading && (
                  <CircularProgress
                    size={68}
                    sx={{
                      color: green[500],
                      position: "absolute",
                      top: -6,
                      left: -6,
                      zIndex: 1,
                    }}
                  />
                )}
              </Box>
            </InputAdornment>
          ),
        }}
        autoFocus
      />
    </Box>
  );
}

export default FormRecoveryPsw;
