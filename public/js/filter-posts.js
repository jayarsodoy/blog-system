document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const posts = document.querySelectorAll(".post-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter").toLowerCase();

      // Update button styles
      filterButtons.forEach(btn => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-secondary");
      });
      button.classList.remove("btn-secondary");
      button.classList.add("btn-primary");

      // Filter posts
      posts.forEach(post => {
        const categoryEl = post.querySelector(".post-category");
        const category = categoryEl ? categoryEl.textContent.trim().toLowerCase() : "";

        if (filter === "all" || category === filter) {
          post.style.display = "block";
        } else {
          post.style.display = "none";
        }
      });
    });
  });
});
