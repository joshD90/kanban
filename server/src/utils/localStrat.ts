import { RowDataPacket } from "mysql2";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";

import { promisePool } from "../db";
import { getUser } from "../queries/authQueries";

//this allows us to configure our local strategy into passport
//so when we have passport.use('local') it will reference this
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
