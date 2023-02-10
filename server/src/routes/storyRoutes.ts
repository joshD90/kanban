import express from "express";
import passport from "passport";

import updateStoryController from "../controllers/storyControllers/updateStoryController";
import { createStoryController } from "../controllers/storyControllers/createStoryController";
import { deleteStoryController } from "../controllers/storyControllers/deleteStoryController";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createStoryController
);
router.put(
  "/:storyId",
  passport.authenticate("jwt", { session: false }),
  updateStoryController
);
router.delete(
  "/:storyId",
  passport.authenticate("jwt", { session: false }),
  deleteStoryController
);

export default router;
