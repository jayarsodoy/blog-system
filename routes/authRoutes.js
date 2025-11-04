// ESM version
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { showRegisterUserPage, registerUser, showLoginUserPage, loginUser, logoutUser } from "../controllers/authController.js";
import { showPostPage } from "../controllers/postController.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";
// import { showAddUserPage } from "../controllers/authController.js";

// Fix __dirname and __filename since they don’t exist in ESM by default
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Auth Routes

router.get("/", showPostPage);

router.get("/register", showRegisterUserPage);
router.post("/register", registerUser);

router.get("/login", showLoginUserPage);
router.post("/login", loginUser);



router.get("/logout", logoutUser);

export default router;