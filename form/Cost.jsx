import React from "react";
import { TextField } from "formik-mui";
import { Field } from "formik";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Cost = () => {
  return (
    <>
      <Typography>What did it cost? 💰</Typography>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ m: 2 }}
        spacing={2}
      >
        <Field
          name="prices"
          placeholder="Price"
          type="number"
          label="Receipt Total"
          component={TextField}
        />
        <Field
          name="tip"
          type="number"
          placeholder="Tip"
          label="Tip"
          component={TextField}
        />
      </Stack>
    </>
  );
};

export default Cost;
