document.addEventListener("DOMContentLoaded", () => {
let offset = 3;
  let loading = false;
  const loadingDiv = document.getElementById('loading');
  const postsList = document.querySelector('.posts-grid') || document.querySelector('.posts-list');

  window.addEventListener('scroll', async function loadMorePosts() {
    if (loading) return;

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      loading = true;
      loadingDiv.style.display = 'block';

      try {
        const res = await fetch(`/posts/loadMore?offset=${offset}`);
        const posts = await res.json();

        if (posts.length > 0) {
          posts.forEach(post => {
            const article = document.createElement('article');
                article.classList.add('post-card');
                article.innerHTML = `
                <div class="post-card-header">
                    <h2 class="post-title">
                    <a href="/posts/view/${post.id}" class="post-link">${post.title}</a>
                    <p class="post-category">${post.category ? post.category.charAt(0).toUpperCase() + post.category.slice(1) : ''}</p>
                    </h2>
                    <p class="post-meta">
                    By <span class="author-name">${post.author_username}</span> 
                    • <time datetime="${post.created_at}">${new Date(post.created_at).toLocaleDateString()}</time>
                    </p>
                </div>

                <p class="post-excerpt">${post.content.substring(0, 150)}...</p>

                <div class="post-card-footer">
                    <div class="post-stats">
                    <span class="stat">💬 ${post.comment_count || 0} Comments</span>
                    </div>
                    <a href="/posts/view/${post.id}" class="btn btn-secondary btn-sm">Read More</a>
                </div>
                `;
                postsList.appendChild(article);
          });

          // ✅ move the offset after successful load
          offset += 5;
        } else {
          // ✅ stop if no more posts
          window.removeEventListener('scroll', loadMorePosts);
        }
      } catch (err) {
        console.error(err);
      } finally {
        loading = false;
        loadingDiv.style.display = 'none';
      }
    }
  });});