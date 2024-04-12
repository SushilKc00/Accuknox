import * as Yup from "yup";

let userSchema = Yup.object({
  username: Yup.string().required("username is required"),
  email: Yup.string()
    .email("enter a valid email")
    .required("email is required"),
  password: Yup.string()
    .min(8, "password must be more than 8")
    .required("password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "password must match")
    .required("confrim password is required"),
});

export default userSchema;
