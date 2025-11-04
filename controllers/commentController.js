// controllers/commentController.js
import { addComment } from '../models/commentModel.js';

export const addCommentController = async (req, res) => {

  try {
    const postId = req.params.postId; // from URL
    const { content } = req.body; // from textarea
    const userId = req.params.userId || 1; // replace with your real auth user id logic

    if (!content || !postId) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const newComment = await addComment(content, postId, userId);

    console.log('New comment added:', newComment);
    res.redirect(`/posts/view/${postId}/${userId}`); // redirect back to the post page
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Error adding comment.' });
  }
};
