import User from "../models/users.model.js";
import CustomErrorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

const isAuthenticateUser = async (req, res, next) => {
  const accessToken = req.cookies.access_token || req.headers.token;

  try {
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message:
          "unauthorized request no token is provided you are not allowed to do that",
      });
    }

    const verifyToken = await jwt.verify(
      accessToken,
      process.env.ACCESSJWTTOKEN
    );

    const user = await User.findById(verifyToken._id).select("-password");

    req.user = user;
    next();
  } catch (error) {
    next(new CustomErrorHandler(error, 401));
  }
};

export default isAuthenticateUser;
