import express from "express";

import updateStoryController from "../controllers/storyControllers/updateStoryController";
import { createStoryController } from "../controllers/storyControllers/createStoryController";
import { deleteStoryController } from "../controllers/storyControllers/deleteStoryController";

const router = express.Router();

router.post("/", createStoryController);
router.put("/:storyId", updateStoryController);
router.delete("/:storyId", deleteStoryController);

export default router;
