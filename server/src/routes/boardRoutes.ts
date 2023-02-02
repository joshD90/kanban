import express from "express";

import { boardCreateController } from "../controllers/boardControllers/boardCreateController";
import { boardGetAllController } from "../controllers/boardControllers/boardGetAllController";
// import { isLoggedIn } from "../utils/isLoggedIn";

const router = express.Router();

router.post("/", boardCreateController);
router.get("/:userId", boardGetAllController);

export default router;
