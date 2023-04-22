import * as React from "react";
import { TextField } from "formik-mui";
import { Field, FieldArray, useFormikContext } from "formik";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

const People = () => {
  const { values, errors } = useFormikContext();
  return (
    <FieldArray name="people">
      {({ remove, push }) => (
        <>
          <Typography>Who ate? 😋</Typography>
          {values.people.length > 0 &&
            values.people.map((friend, index) => (
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}
                sx={{ m: 2 }}
                key={index}
              >
                <Field
                  name={`people.${index}.name`}
                  label="Name"
                  component={TextField}
                />
                <Tooltip title="Delete">
                  <Button
                    type="button"
                    variant="outlined"
                    sx={{ minWidth: 0, height: 56, width: 56 }}
                    className="secondary"
                    onClick={() => remove(index)}
                  >
                    {"🗑️"}
                  </Button>
                </Tooltip>
              </Stack>
            ))}
          <Button
            type="button"
            sx={{ m: 2 }}
            variant="outlined"
            className="secondary"
            onClick={() => push({ name: "" })}
          >
            {"Add Friend 💃"}
          </Button>
          {typeof errors.people === "string" ? (
            <Typography variant="body2" sx={{ m: 4, color: "error.main" }}>
              {errors.people}
            </Typography>
          ) : null}
        </>
      )}
    </FieldArray>
  );
};

export default People;
