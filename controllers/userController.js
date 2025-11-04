import { postPerUser } from "../models/postModel.js";
import { commentsPerUser } from "../models/commentModel.js";

export const showProfilePage = async (req, res) => {
  try {
    const posts = await postPerUser(req);
    const comments = await commentsPerUser(req);
    console.log(posts);
    res.render("users/profile", { layout: "layout", title: "User Profile", posts: posts, comments: comments });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};