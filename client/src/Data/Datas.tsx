import { LoginInputTypes, SignupInputTypes } from "../types/authTypes";

export const LoginInputs: LoginInputTypes[] = [
  {
    name: "email",
    placeholder: "Enter username or email....",
    type: "text",
  },
  {
    name: "password",
    placeholder: "Enter your password",
    type: "password",
  },
];

export const SigninInputs: SignupInputTypes[] = [
  {
    name: "username",
    placeholder: "Enter username",
    type: "text",
  },
  {
    name: "email",
    placeholder: "Enter your email",
    type: "email",
  },
  {
    name: "password",
    placeholder: "Enter your password",
    type: "password",
  },
  {
    name: "confirmpassword",
    placeholder: "Enter confirm password",
    type: "password",
  },
];
