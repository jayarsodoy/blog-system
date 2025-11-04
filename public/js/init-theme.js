;(() => {
  const theme = localStorage.getItem("theme") || "system"
  const html = document.documentElement

  if (theme === "dark") {
    html.classList.add("dark")
  } else if (theme === "light") {
    html.classList.remove("dark")
  } else {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    if (isDark) {
      html.classList.add("dark")
    }
  }
})()
