import * as Yup from "yup";

const validationSchema = [
  Yup.object().shape({
    people: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("Required"),
        })
      )
      .min(2, "You need at least 2 people to split"),
  }),
  Yup.object().shape({
    plates: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("Required"),
          price: Yup.number()
            .required("Required")
            .positive("Must be a positive number"),
          eatenBy: Yup.array().of(Yup.string()).min(1, "Required"),
        })
      )
      .min(1, "No food, no website"),
  }),
  Yup.object().shape({
    price: Yup.number()
      .required("Required")
      .positive("Must be a positive number"),
    tip: Yup.number()
      .required("If you didn’t tip this app breaks")
      .positive("Must be a positive number"),
  }),
];

export default validationSchema;
