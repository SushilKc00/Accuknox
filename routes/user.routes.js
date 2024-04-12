import express from "express";
import {
  isUserAuthenticate,
  loginController,
  logoutController,
  registerController,
} from "../controllers/user.controllers.js";
import isAuthenticateUser from "../middlewares/isAuthenticateUser.js";

const routes = express.Router();

routes.route("/user/authenticate").get(isAuthenticateUser, isUserAuthenticate);
routes.route("/register").post(registerController);
routes.route("/login").post(loginController);
routes.route("/logout").post(isAuthenticateUser, logoutController);

export default routes;
