// ESM version
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { showAddUserPage } from "../controllers/authController.js";

// Fix __dirname and __filename since they don’t exist in ESM by default
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Landing page route
router.get("/", showAddUserPage);

export default router;