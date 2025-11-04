
import { getAllPosts, createPost, updatePost, postPerUser, deletePost } from "../models/postModel.js";
import { getCommentById } from "../models/commentModel.js";

export const showPostPage = async (req, res) => {
  try {
    const posts = await getAllPosts();
    req.session.posts = posts;
    res.render("posts/index", { layout: "layout", title: "Posts", user: req.session.user, posts: posts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const showExplorePage = async (req, res) => {
  try {
    const posts = await getAllPosts();
    req.session.posts = posts;
    res.render("posts/explore", { layout: "layout", title: "Posts", user: req.session.user, posts: posts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const showCreatePage = async (req, res) => {
  try {
    const posts = await getAllPosts();
    req.session.posts = posts;
    res.render("posts/create", { layout: "layout", title: "Create Post", user: req.session.user, posts: posts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const createNewPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const userId = req.session.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated.' });
    }

    const newPost = await createPost(title, content, category, userId);
    res.status(201).json({ success: true, message: 'Post created successfully!', post: newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ success: false, message: 'Failed to create post. Please try again.' });
  }
};

export const updateCurrentPost = async (req, res) => {
  try {
    const { title, content, category, postId } = req.body;

    if (!postId) {
      return res.status(400).json({ success: false, message: 'Post ID is missing.' });
    }

    const updatedPost = await updatePost(postId, title, content, category);

    res.status(200).json({ success: true, message: 'Post updated successfully!', post: updatedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ success: false, message: 'Failed to update post. Please try again.' });
  }
};


export const viewFullPost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.params;
  const comments = await getCommentById(postId);
  console.log("Viewing post with ID:", postId);
  console.log("Viewing post with ID:", userId);
  req.session.comments = comments;
  res.render("posts/show", { layout: "layout", title: "View Post", user: req.session.user, post: req.session.posts.find(p => p.id == postId), comments: comments });
};

export const editPost = async (req, res) => {
  const { id } = req.params;
  console.log("Editing post with ID:", id);

  try {
    const posts = await postPerUser(req);

    req.session.posts = posts;

    const post = req.session.posts.find(p => p.id == id);

    if (!post) {
      return res.status(404).render('error', { message: 'Post not found' });
    }

    res.render("posts/edit", { 
      layout: "layout", 
      title: "Edit Post", 
      user: req.session.user, 
      post 
    });
  } catch (error) {
    console.error('Error loading post:', error);
    res.status(500).render('error', { message: 'Error loading post data' });
  }
};

export const deletePostController = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await deletePost(id);

    if (!deletedPost) {
      return res.status(404).send('Post not found');
    }

    res.redirect('/users/profile'); // redirect back to list or wherever you want
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).send('Internal Server Error');
  }
};
