import express from "express";
import { createStoryController } from "../controllers/storyControllers/createStoryController";

const router = express.Router();

router.get("/", createStoryController);

export default router;
