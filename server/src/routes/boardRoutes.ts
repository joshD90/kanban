import express from "express";

import { isLoggedIn } from "../utils/isLoggedIn";

import { boardCreateController } from "../controllers/boardControllers/boardCreateController";
import { boardGetAllController } from "../controllers/boardControllers/boardGetAllController";
import { boardGetSingleController } from "../controllers/boardControllers/boardGetSingleController";
// import { isLoggedIn } from "../utils/isLoggedIn";

const router = express.Router();

router.post("/", boardCreateController);
router.get("/:userId", isLoggedIn, boardGetAllController);
router.get("/:userId/:boardId", boardGetSingleController);

export default router;
