import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { showProfilePage } from "../controllers/userController.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get("/profile", showProfilePage);



export default router;