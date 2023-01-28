import { RowDataPacket } from "mysql2";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";

import { connection } from "../db";
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
//tell passport how to create the cookie
passport.serializeUser((user: Express.User, done): void => {
  done(null, user.email);
});

passport.deserializeUser((email: string | undefined, done): void => {
  connection.query(getUser, [email], (err, result: RowDataPacket[]) => {
    if (err) return done(err, null);
    if (!result[0]) return done(null, false);

    console.log(result[0]);
    //we need to extract the user information and convert it into a type that matches our express namespace
    const user = {
      id: result[0].id,
      email: result[0].email,
      fName: result[0].fName,
      lName: result[0].lName,
    };
    done(err, user);
  });
});

//this allows us to configure our local strategy into passport
//so when we have passport.use('local') it will reference this
passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      console.log(email, password);

      connection.query(getUser, [email], (err, result: RowDataPacket[]) => {
        console.log(err, result);

        //handle errors or null user
        if (err) return done(err);
        if (!result || result.length === 0) return done(null, false);

        //we need to extract the user information and convert it into a type that matches our express namespace
        const user = {
          id: result[0].id,
          email: result[0].email,
          fName: result[0].fName,
          lName: result[0].lName,
          password: result[0].hashedPW,
        };

        // //use bcrypt to compare our passwords
        bcrypt.compare(password, user.password, (error, data) => {
          console.log(error, data);
          if (error) return done(err);
          if (!data)
            return done(null, false, { message: "Password does not match" });

          return done(null, user);
        });
      });
    }
  )
);
