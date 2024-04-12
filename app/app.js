import dotenv from "dotenv";
dotenv.config();
import express from "express";
import errorHandler from "../middlewares/errorHandler.middleware.js";
import cors from "cors";
import cookiParser from "cookie-parser";
import userRoutes from "../routes/user.routes.js";
import { createServer } from "http";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// SET APPLICATION MIDDLEWARES***********
app.use(cors());
app.use(cookiParser());
app.use(express.json());
app.use(express.static("../public"));
app.use(express.urlencoded({ extended: true }));

// ROUTES MIDDLEWARES*****************
app.use("/api/auth", userRoutes);

// serve client fiel******
app.use(express.static(path.join(__dirname, "../client/dist/")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// ERROR HANDLER MIDDLEWARE************
app.use(errorHandler);

export default app;
