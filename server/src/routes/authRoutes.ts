import express from "express";
import passport from "passport";

//import our controllers
import loginController from "../controllers/authControllers/loginController";
import createUserController from "../controllers/authControllers/createUserController";
import getUserDataController from "../controllers/authControllers/getUserDataController";
import getUserLogoutController from "../controllers/authControllers/getUserLogoutController";

const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  loginController
);
router.post("/create", createUserController);
router.get(
  "/user-data",
  passport.authenticate("jwt", { session: false }),
  getUserDataController
);
router.get("/logout", getUserLogoutController);

export default router;
