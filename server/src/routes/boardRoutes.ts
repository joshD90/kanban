import express from "express";

import { boardCreateController } from "../controllers/boardControllers/boardCreateController";
import { isLoggedIn } from "../utils/isLoggedIn";

const router = express.Router();

router.post("/", boardCreateController);

export default router;
