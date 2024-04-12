import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    unique: [true, "email should be unique"],
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.username,
      email: this.email,
    },
    process.env.ACCESSJWTTOKEN,
    {
      expiresIn: "1d",
    }
  );
};

const User = model("User", userSchema);

export default User;
