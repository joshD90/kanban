import express from "express";
import passport from "passport";

import { boardCreateController } from "../controllers/boardControllers/boardCreateController";
import { boardGetAllController } from "../controllers/boardControllers/boardGetAllController";
import { boardGetSingleController } from "../controllers/boardControllers/boardGetSingleController";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  boardCreateController
);
router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  boardGetAllController
);
router.get(
  "/:userId/:boardId",
  passport.authenticate("jwt", { session: false }),
  boardGetSingleController
);

export default router;
