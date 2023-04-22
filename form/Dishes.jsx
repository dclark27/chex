import React from "react";
import { FieldArray, useFormikContext } from "formik";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Dish from "./Dish";

const Dishes = () => {
  const { values, errors } = useFormikContext();
  return (
    <FieldArray name="plates">
      {({ remove, push }) => (
        <Stack spacing={2} alignItems="center">
          <Typography>What did you order? 🥘</Typography>
          {values.plates.length > 0 &&
            values.plates.map((_plate, index) => (
              <Dish key={index} index={index} remove={remove} />
            ))}
          <Stack>
            <Button
              type="button"
              variant="outlined"
              className="secondary"
              sx={{ mb: 2 }}
              onClick={() =>
                push({
                  name: "",
                  price: "",
                  eatenBy: [],
                })
              }
            >
              {"Add Dish 😋"}
            </Button>
            {typeof errors.plates === "string" ? (
              <Typography variant="body2" sx={{ m: 4, color: "red" }}>
                {errors.plates}
              </Typography>
            ) : null}
          </Stack>
        </Stack>
      )}
    </FieldArray>
  );
};

export default Dishes;
