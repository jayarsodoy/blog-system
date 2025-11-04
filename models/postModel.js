import pool from './db.js';

export const getAllPosts = async () => {
  const result = await pool.query(`SELECT 
    p.*, 
    u.username AS author_username,
    COUNT(c.id) AS comment_count
    FROM posts p
    INNER JOIN users u ON p.user_id = u.id
    LEFT JOIN comments c ON c.post_id = p.id
    GROUP BY p.id, u.username
    ORDER BY p.created_at DESC;`);
  return result.rows;
};

// export const getPostById = async (req) => {
//   const userId = req.session.post.id;
//   const result = await pool.query('SELECT p.*, u.username AS author_username FROM posts p INNER JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC');
//   return result.rows;
// };

export const createPost = async (title, content, category, userId) => {
  const query = `INSERT INTO posts (title, content, category, user_id, created_at)
                 VALUES ($1, $2, $3, $4, NOW())
                 RETURNING *;`;
  const values = [title, content, category, userId];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updatePost = async (postId, title, content, category) => {
  
  const query = `
    UPDATE posts
    SET title = $1,
        content = $2,
        category = $3,
        updated_at = NOW()
    WHERE id = $4
    RETURNING *;
  `;
  const values = [title, content, category, postId];
  const result = await pool.query(query, values);
  return result.rows[0];
};


export const postPerUser = async (req) => {
  const userId = req.session.user.id;

  const result = await pool.query(
    `SELECT p.*, u.username AS author_username
     FROM public.posts p 
     INNER JOIN users u ON p.user_id = u.id
     WHERE user_id = $1
     ORDER BY id ASC;`,
    [userId]
  );

  return result.rows;
};

export async function deletePost(postId) {
  try {
    // Delete all comments linked to this post first
    await pool.query('DELETE FROM comments WHERE post_id = $1', [postId]);

    // Then delete the post itself
    const result = await pool.query('DELETE FROM posts WHERE id = $1', [postId]);

    return result.rowCount > 0;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}
