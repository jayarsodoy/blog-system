import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { showPostPage, 
    loadMorePosts,
    viewFullPost, 
    showExplorePage, 
    showCreatePage, 
    createNewPost, 
    editPost, 
    updateCurrentPost, 
    deletePostController } 
    from "../controllers/postController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get("/index", showPostPage);
router.get("/loadMore", loadMorePosts);
router.get("/viewFullPost", viewFullPost);

router.get("/view/:postId/:userId", viewFullPost);
router.get("/explore", showExplorePage);

router.get("/create", isAuthenticated, showCreatePage)
router.post("/create", createNewPost);

router.get("/edit/:id", isAuthenticated, editPost);
router.post("/edit",isAuthenticated, updateCurrentPost);

router.post('/delete/:id',isAuthenticated, deletePostController);



export default router;