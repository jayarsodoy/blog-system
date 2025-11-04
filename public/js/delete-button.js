class DeleteButton {
  constructor(buttonSelector, postId, options = {}) {
    this.button = document.querySelector(buttonSelector)
    this.postId = postId
    this.onDeleted = options.onDeleted || (() => {})
    this.loading = false

    this.init()
  }

  init() {
    this.button.addEventListener("click", () => this.handleDelete())
  }

  async handleDelete() {
    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return
    }

    this.loading = true
    this.button.disabled = true
    const originalText = this.button.textContent
    this.button.textContent = "Deleting..."

    try {
      await this.deletePost()
      this.onDeleted()
      window.location.href = "/explore"
    } catch (error) {
      console.error("[v0] Error deleting post:", error)
      alert("Failed to delete post. Please try again.")
      this.button.textContent = originalText
      this.button.disabled = false
      this.loading = false
    }
  }

  async deletePost() {
    const response = await fetch(`/api/posts/${this.postId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    if (!response.ok) throw new Error("Failed to delete post")
    return await response.json()
  }
}

export { DeleteButton }
