import { RequestHandler } from "express";

//this is a middleware function, if the user is authenticated then we skip on to (req,res) callback function
//of an endpoint or we return an error
export const isLoggedIn: RequestHandler = (req, res, next) => {
  console.log(req.session);
  if (!req.session)
    return res.status(401).json("You are not authorised to access this route");
  return next();
};
