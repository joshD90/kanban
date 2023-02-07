import { PassportStatic } from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";

import { promisePool } from "../db";
import { getUser } from "../queries/authQueries";

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

//this allows us to configure our local strategy into passport
//so when we have passport.use('local') it will reference this
module.exports = function (passport: PassportStatic) {
  passport.use(
    new Strategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, suppliedPassword, done): Promise<void> => {
        const connection = promisePool;
        if (!connection) return done("Could not Connect To DB");
        try {
          //find out user by their email
          const [rows] = await connection.query(getUser, [email]);
          if (!rows || rows.length === 0) return done(null, false);
          //we need to extract the user information and convert it into a type that matches our express namespace
          const user = {
            id: rows[0].id,
            email: rows[0].email,
            fName: rows[0].fName,
            lName: rows[0].lName,
            password: rows[0].hashedPW,
          };
          //use bcrypt to compare our passwords
          const data = await bcrypt.compare(suppliedPassword, user.password);
          if (!data)
            return done(null, false, { message: "Passwords do not match" });

          //extract away sensitve data before passing to req.user object
          const { password, ...rest } = user;
          return done(null, rest);
        } catch (error) {
          console.log("error");
          return done(error);
        }
      }
    )
  );
  //tell passport how to create the cookie
  passport.serializeUser((user: Express.User, done): void => {
    console.log("serializing");
    return done(null, user.email);
  });

  passport.deserializeUser(
    async (email: string | undefined, done): Promise<void> => {
      console.log("deserializing USER");
      //connect to db
      const connection = promisePool;
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
};
