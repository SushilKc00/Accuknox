import * as Yup from "yup";

let loginSchema = Yup.object({
  email: Yup.string()
    .email("enter a valid email")
    .required("email and username is required"),
  password: Yup.string().required("Password is required"),
});

export default loginSchema;
