import "dotenv/config";
import express, { Request, Response } from "express";
import session from "express-session";
import passport from "passport";

import authRoutes from "./routes/authRoutes";
import "./utils/localStrat";

//set up express
const app = express();

//set up our passport session middleware.
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
//Initialize passport and passport session
app.use(passport.initialize());
app.use(passport.session());

//and express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//router middleware
app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
