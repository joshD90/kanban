import "dotenv/config";
import express, { Request, Response } from "express";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";

require("./utils/localStrat")(passport);

import "./utils/localStrat";

//set up express
const app = express();

//set up cors - credentials true allows up to pass cookies data
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//set up our passport session middleware.
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
      domain: "localhost:5173",
    },
  })
);

//Initialize passport and passport session
app.use(passport.initialize());
app.use(passport.session());

//and express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//stackoverflow suggests that the routes need to be placed after intializsation of passport
import authRoutes from "./routes/authRoutes";
import boardRoutes from "./routes/boardRoutes";
import storyRoutes from "./routes/storyRoutes";

//router middleware
app.use("/auth", authRoutes);
app.use("/boards", boardRoutes);
app.use("/stories", storyRoutes);

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
