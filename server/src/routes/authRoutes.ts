import express from "express";
import passport from "passport";

import { isLoggedIn } from "../utils/isLoggedIn";

//import our controllers
import loginController from "../controllers/authControllers/loginController";
import createUserController from "../controllers/authControllers/createUserController";
import getUserDataController from "../controllers/authControllers/getUserDataController";

const router = express.Router();

router.post("/login", passport.authenticate("local"), loginController);
router.post("/create", createUserController);
router.get("/user-data", isLoggedIn, getUserDataController);

export default router;
