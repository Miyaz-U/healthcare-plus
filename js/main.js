const menuToggle = document.getElementById("menuToggle")
const navLinks = document.querySelector(".nav-links")

if (menuToggle) {
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("nav-open")
        menuToggle.classList.toggle("open")
    })
}

const themeToggle = document.getElementById("themeToggle")

function applyTheme(theme) {
    document.body.setAttribute("data-theme", theme)
    themeToggle.textContent = theme === "dark"? "☀️":"🌙"
}

const savedTheme = localStorage.getItem("theme") || "light"
applyTheme(savedTheme)

if (themeToggle) {
    themeToggle.addEventListener("click", function() {
        const isDark = document.body.getAttribute("data-theme") === "dark"
        const newTheme = isDark? "light" : "dark"

        applyTheme(newTheme)
        localStorage.setItem("theme", newTheme)
    })
}