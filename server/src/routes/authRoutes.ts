import express from "express";
import passport from "passport";

import loginController from "../controllers/authControllers/loginController";
import createUserController from "../controllers/authControllers/createUserController";

const router = express.Router();

router.post("/login", passport.authenticate("local"), loginController);

router.post("/create", createUserController);

export default router;
