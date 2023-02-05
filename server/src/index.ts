import "dotenv/config";
import express, { Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";

import { asyncConn } from "./db";
import { getUser } from "./queries/authQueries";

import authRoutes from "./routes/authRoutes";
import boardRoutes from "./routes/boardRoutes";
import storyRoutes from "./routes/storyRoutes";

import "./utils/localStrat";

//set up express
const app = express();

//set up cors - credentials true allows up to pass cookies data
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//set up our passport session middleware.
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24, secure: false },
  })
);

//this allows for our user interface to be used throughout the server however we add it onto the Express namespace
//to avoid any conflicts later on
declare global {
  namespace Express {
    interface User {
      email?: string;
      id?: string;
      fName?: string;
      lName?: string;
      password?: string;
    }
  }
}

//Initialize passport and passport session
app.use(passport.initialize());
app.use(passport.session());

//tell passport how to create the cookie
passport.serializeUser((user: Express.User, done): void => {
  return done(null, user.email);
});

passport.deserializeUser(
  async (email: string | undefined, done): Promise<void> => {
    //connect to db
    const connection = await asyncConn();
    try {
      //find our user based on email and if they don't exist throw error
      const [rows] = await connection.query(getUser, [email]);

      if (!rows || rows.length === 0) return done(null, false);

      const user = {
        id: rows[0].id,
        email: rows[0].email,
        fName: rows[0].fName,
        lName: rows[0].lName,
      };
      // create a session object holding our user details on server side
      return done(null, user);
    } catch (error) {
      console.log(error);
      return done(error, null);
    }
  }
);

//and express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//router middleware
app.use("/auth", authRoutes);
app.use("/boards", boardRoutes);
app.use("/stories", storyRoutes);

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
