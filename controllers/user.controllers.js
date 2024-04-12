import User from "../models/users.model.js";
import CustomErrorHandler from "../utils/error.js";
import asynchHandler from "../utils/asynchHandler.js";

const isUserAuthenticate = (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "user is authenticated", user: req.user });
};

const registerController = asynchHandler(async (req, res, next) => {
  const { username, email, password, profile } = req.body;
  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    return next(new CustomErrorHandler("user already register", 401));
  }

  await User.create({
    username,
    email,
    password,
    profile,
  });

  return res
    .status(200)
    .json({ success: true, message: "register successfull" });
});

const loginController = asynchHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const isUser = await User.findOne({ email });

  if (!isUser) {
    return next(new CustomErrorHandler("user not found", 401));
  }

  const isMatch = await isUser.comparePassword(password);

  if (!isMatch) {
    return next(new CustomErrorHandler("username or password incorrect", 401));
  }
  const accessToken = await isUser.generateToken();

  return res
    .status(200)
    .cookie("access_token", accessToken)
    .json({
      success: true,
      message: "login successful",
      user: {
        accessToken,
        _id: isUser._id,
        email: isUser.email,
        name: isUser.username,
      },
    });
});

const logoutController = (req, res) => {
  res
    .status(200)
    .clearCookie("access_token")
    .json({ success: true, message: "logout successfull" });
};

export {
  isUserAuthenticate,
  registerController,
  loginController,
  logoutController,
};
