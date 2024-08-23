import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/AuthRoutes.js";
import urlsRoutes from "./routes/UrlsRoutes.js";
import { redirectUrl } from "./controllers/UrlsController.js";

const app = express();
dotenv.config();
const allowOrigins = [process.env.ALLOWED_ORIGIN, "http://localhost:5000"];
app.use(
  cors({
    origin: allowOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
  })
);
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT;
const databaseUrl = process.env.DATABASE_URL;

app.use("/api/auth", authRouter);
app.use("/api/shortener", urlsRoutes);
app.get("/:slug", redirectUrl);

app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`);
});

mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Connected to DB yay!");
  })
  .catch((e) => {
    console.log(e);
  });
