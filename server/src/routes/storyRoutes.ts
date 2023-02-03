import express from "express";
import { createStoryController } from "../controllers/storyControllers/createStoryController";

const router = express.Router();

router.post("/", createStoryController);

export default router;
