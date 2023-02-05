import express from "express";

import updateStoryController from "../controllers/storyControllers/updateStoryController";
import { createStoryController } from "../controllers/storyControllers/createStoryController";

const router = express.Router();

router.post("/", createStoryController);
router.put("/:storyId", updateStoryController);

export default router;
