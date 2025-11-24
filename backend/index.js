import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";

import "./src/passport/googleStrategy.js";

import authRouter from "./src/routes/auth.js";
import usersRouter from "./src/routes/users.js";
import wordsRouter from "./src/routes/words.js";
import baseWordsRouter from "./src/routes/baseWords.js";
import gameSessionsRouter from "./src/routes/gameSessions.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

const port = process.env.PORT || 3000;

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/words", wordsRouter);
app.use("/api/basewords", baseWordsRouter);
app.use("/api/gamesessions", gameSessionsRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello world!");
});

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, async () => {
      console.log(`Listening on port: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });
