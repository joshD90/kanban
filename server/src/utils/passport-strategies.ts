import passport from "passport";
import { Application } from "express";
import { Strategy as LocalStrategy } from "passport-local";
import { JwtFromRequestFunction, Strategy as JWTStrategy } from "passport-jwt";
import bcrypt from "bcrypt";

import { promisePool } from "../db";
import { getUser } from "../queries/authQueries";
import config from "../config";
import { RowDataPacket } from "mysql2";

//export a function that we can pass app into that will initialize passport in server
export const configurePassport = (app: Application) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          //find our user
          const userFound: RowDataPacket = await promisePool.query(getUser, [
            email,
          ]);
          const user = userFound[0][0];

          if (!user) return done(null, false);
          //check passwords match
          const pwResult = await bcrypt.compare(password, user.hashedPW);

          if (!pwResult) return done(null, false);
          //sanitise our user
          delete user.hashedPW;
          return done(null, user);
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: cookieExtractor,
        secretOrKey: config.jwt.secret,
      },
      (payload, done) => {
        try {
          done(null, payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  //initialize our passport
  app.use(passport.initialize());
};

const cookieExtractor: JwtFromRequestFunction = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};
