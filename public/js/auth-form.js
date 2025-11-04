class AuthForm {
  constructor(formSelector, options = {}) {
    this.form = document.querySelector(formSelector)
    this.isRegister = options.isRegister || false
    this.onSubmit = options.onSubmit || (() => {})

    this.emailInput = this.form.querySelector('[name="email"]')
    this.passwordInput = this.form.querySelector('[name="password"]')
    this.confirmPasswordInput = this.form.querySelector('[name="confirmPassword"]')
    this.errorDiv = this.form.querySelector("[data-error]")
    this.submitBtn = this.form.querySelector('button[type="submit"]')

    this.init()
  }

  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e))
  }

  handleSubmit(e) {
    e.preventDefault()
    this.clearError()

    const email = this.emailInput.value.trim()
    const password = this.passwordInput.value
    const confirmPassword = this.confirmPasswordInput?.value || ""

    if (!email || !password) {
      this.showError("Please fill in all fields")
      return
    }

    if (this.isRegister && password !== confirmPassword) {
      this.showError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      this.showError("Password must be at least 6 characters")
      return
    }

    this.setLoading(true)
    try {
      this.onSubmit({ email, password, confirmPassword })
    } catch (err) {
      this.showError("An error occurred. Please try again.")
    } finally {
      this.setLoading(false)
    }
  }

  showError(message) {
    if (this.errorDiv) {
      this.errorDiv.textContent = message
      this.errorDiv.style.display = "block"
    }
  }

  clearError() {
    if (this.errorDiv) {
      this.errorDiv.textContent = ""
      this.errorDiv.style.display = "none"
    }
  }

  setLoading(loading) {
    this.emailInput.disabled = loading
    this.passwordInput.disabled = loading
    if (this.confirmPasswordInput) {
      this.confirmPasswordInput.disabled = loading
    }
    this.submitBtn.disabled = loading
    this.submitBtn.textContent = loading ? "Loading..." : this.submitBtn.dataset.originalText || "Submit"
  }
}

export { AuthForm }
