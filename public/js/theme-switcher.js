class ThemeSwitcher {
  constructor(buttonSelector) {
    this.button = document.querySelector(buttonSelector)
    this.sunIcon = this.button.querySelector('[data-icon="sun"]')
    this.moonIcon = this.button.querySelector('[data-icon="moon"]')

    this.init()
  }

  init() {
    this.button.addEventListener("click", () => this.handleToggle())
    this.updateUI()
  }

  handleToggle() {
    const current = this.getTheme()
    const next = current === "dark" ? "light" : "dark"
    this.setTheme(next)
    this.updateUI()
  }

  getTheme() {
    const stored = localStorage.getItem("theme")
    if (stored) return stored
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }

  setTheme(theme) {
    localStorage.setItem("theme", theme)
    const html = document.documentElement

    if (theme === "dark") {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
  }

  updateUI() {
    const theme = this.getTheme()
    if (theme === "light") {
      this.sunIcon.style.display = "block"
      this.moonIcon.style.display = "none"
    } else {
      this.sunIcon.style.display = "none"
      this.moonIcon.style.display = "block"
    }
  }
}

export { ThemeSwitcher }
