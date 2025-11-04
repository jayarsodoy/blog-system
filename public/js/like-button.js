class LikeButton {
  constructor(buttonSelector, postId, initialLikes = 0, initialLiked = false) {
    this.button = document.querySelector(buttonSelector)
    this.postId = postId
    this.likes = initialLikes
    this.liked = initialLiked
    this.loading = false

    this.countSpan = this.button.querySelector("[data-count]")
    this.icon = this.button.querySelector("svg")

    this.init()
  }

  init() {
    this.button.addEventListener("click", () => this.handleLike())
    this.updateUI()
  }

  async handleLike() {
    if (this.loading) return

    this.loading = true
    this.button.disabled = true

    try {
      if (this.liked) {
        const result = await this.unlikePost()
        this.likes = result.likes
        this.liked = false
      } else {
        const result = await this.likePost()
        this.likes = result.likes
        this.liked = true
      }
      this.updateUI()
    } catch (error) {
      console.error("[v0] Error toggling like:", error)
    } finally {
      this.loading = false
      this.button.disabled = false
    }
  }

  async likePost() {
    const response = await fetch(`/api/posts/${this.postId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to like post")
    return await response.json()
  }

  async unlikePost() {
    const response = await fetch(`/api/posts/${this.postId}/unlike`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to unlike post")
    return await response.json()
  }

  updateUI() {
    if (this.countSpan) {
      this.countSpan.textContent = this.likes
    }
    if (this.liked) {
      this.button.classList.add("liked")
      this.icon.setAttribute("fill", "currentColor")
    } else {
      this.button.classList.remove("liked")
      this.icon.setAttribute("fill", "none")
    }
  }
}

export { LikeButton }
