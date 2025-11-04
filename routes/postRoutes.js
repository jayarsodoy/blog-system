import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { showPostPage, viewFullPost, showExplorePage, showCreatePage, createNewPost, editPost, updateCurrentPost, deletePostController } from "../controllers/postController.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get("/index", showPostPage);
router.get("/viewFullPost", viewFullPost);

router.get("/view/:postId/:userId", viewFullPost);
router.get("/explore", showExplorePage);
router.get("/create", showCreatePage);
router.post("/create", createNewPost);

router.get("/edit/:id", editPost);
router.post("/edit", updateCurrentPost);

router.post('/delete/:id', deletePostController);

// router.get("/layout", isAuthenticated, (req, res) => {
//   res.render("posts/index", {
//     title: "Dashboard",
//     user: req.session.use,
//   });
// });

export default router;