import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { addCommentController } from "../controllers/commentController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.post("/:postId/:userId", addCommentController);

export default router;