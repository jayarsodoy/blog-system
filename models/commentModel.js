import pool from './db.js';

export const getCommentById = async (postId) => {
  const result = await pool.query(`SELECT c.*, 
        u.username AS author_username
        FROM comments c
        INNER JOIN users u ON c.user_id = u.id
        WHERE c.post_id = $1
        ORDER BY c.created_at DESC
    `, [postId]);
  return result.rows;
};

export const commentsPerUser = async (req) => {
  const userId = req.session.user.id;

  const result = await pool.query(`
  SELECT 
    p.*, 
    p.title,
	  c.content AS content,
    COUNT(c.id) AS total_comments
  FROM public.posts p
  INNER JOIN public.comments c ON p.id = c.post_id
  WHERE c.user_id = $1
  GROUP BY p.id, p.title, c.content
  ORDER BY MAX(c.created_at) DESC;
  `, [userId]);
  return result.rows;
};

export const addComment = async (content, post_id, user_id) => {
  const query = `INSERT INTO comments (content, post_id, user_id)
                 VALUES ($1, $2, $3)
                 RETURNING *;`;
  const values = [content, post_id, user_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};
