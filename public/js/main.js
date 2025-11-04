// ============================================
// FORM VALIDATION
// ============================================

// Login Form Validation
const loginForm = document.getElementById("loginForm")
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value

    let isValid = true

    // Email validation
    if (!isValidEmail(email)) {
      showError("emailError", "Please enter a valid email address")
      isValid = false
    } else {
      clearError("emailError")
    }

    // Password validation
    if (password.length < 6) {
      showError("passwordError", "Password must be at least 6 characters")
      isValid = false
    } else {
      clearError("passwordError")
    }

    if (!isValid) {
      e.preventDefault()
    }
  })
}

// Register Form Validation
const registerForm = document.getElementById("registerForm")
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    const username = document.getElementById("username").value.trim()
    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirmPassword").value

    let isValid = true

    // Username validation
    if (username.length < 3) {
      showError("usernameError", "Username must be at least 3 characters")
      isValid = false
    } else {
      clearError("usernameError")
    }

    // Email validation
    if (!isValidEmail(email)) {
      showError("emailError", "Please enter a valid email address")
      isValid = false
    } else {
      clearError("emailError")
    }

    // Password validation
    if (password.length < 6) {
      showError("passwordError", "Password must be at least 6 characters")
      isValid = false
    } else {
      clearError("passwordError")
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      showError("confirmPasswordError", "Passwords do not match")
      isValid = false
    } else {
      clearError("confirmPasswordError")
    }

    if (!isValid) {
      e.preventDefault()
    }
  })
}

// Post Form Validation
const postForm = document.getElementById("postForm")
if (postForm) {
  postForm.addEventListener("submit", (e) => {
    const title = document.getElementById("title").value.trim()
    const content = document.getElementById("content").value.trim()

    if (title.length === 0 || content.length === 0) {
      alert("Please fill in all fields")
      e.preventDefault()
    }
  })
}

// Comment Form Validation
const commentForm = document.getElementById("commentForm")
if (commentForm) {
  commentForm.addEventListener("submit", (e) => {
    const content = document.getElementById("content").value.trim()

    if (content.length === 0) {
      alert("Please write a comment")
      e.preventDefault()
    }
  })
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId)
  if (errorElement) {
    errorElement.textContent = message
    errorElement.classList.add("show")
  }
}

function clearError(elementId) {
  const errorElement = document.getElementById(elementId)
  if (errorElement) {
    errorElement.textContent = ""
    errorElement.classList.remove("show")
  }
}

// ============================================
// LIKE FUNCTIONALITY
// ============================================

const likeBtn = document.getElementById("likeBtn")
if (likeBtn) {
  likeBtn.addEventListener("click", async function () {
    const postId = this.dataset.postId

    try {
      const response = await fetch(`/posts/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        document.getElementById("likeCount").textContent = data.likes_count
        document.getElementById("likeIcon").textContent = data.liked ? "❤️" : "🤍"
      }
    } catch (error) {
      console.error("Error liking post:", error)
    }
  })
}

// ============================================
// AUTO-HIDE ALERTS
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const alerts = document.querySelectorAll(".alert")
  alerts.forEach((alert) => {
    setTimeout(() => {
      alert.style.opacity = "0"
      alert.style.transition = "opacity 0.3s ease-in-out"
      setTimeout(() => {
        alert.style.display = "none"
      }, 300)
    }, 5000)
  })
})
