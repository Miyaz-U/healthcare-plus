const filterButtonsContainer = document.getElementById("filterButtons")
const favouritesBtn = filterButtonsContainer.querySelector('[data-specialization="Favourites"]')

const specializations = [...new Set(doctors.map(function (doctor) {
    return doctor.specialization
}))]

specializations.forEach(function (specialization) {
    const btn = document.createElement("button")
    btn.className = "filter-btn"
    btn.title = specialization
    btn.setAttribute("data-specialization", specialization)
    btn.textContent = specialization
    filterButtonsContainer.insertBefore(btn, favouritesBtn)
})

const filterButtons = document.querySelectorAll(".filter-btn")
const searchInput = document.getElementById("searchInput")

let currentSpecialization = "All"
let currentSearchText = ""

function applyFilters() {
    let result = doctors

    if (currentSpecialization === "Favourites") {
        result = result.filter(function (doctor) {
            return isFavourite(doctor.id)
        })
    } else if (currentSpecialization !== "All") {
        result = result.filter(function (doctor) {
            return doctor.specialization === currentSpecialization
        })
    }

    if (currentSearchText !== "") {
        result = result.filter(function (doctor) {
            return doctor.name.toLowerCase().includes(currentSearchText.toLowerCase())
        })
    }
    showDoctors(result)
}

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active")
        })
        button.classList.add("active")
        currentSpecialization = button.getAttribute("data-specialization")
        applyFilters()
    })
})

searchInput.addEventListener("input", function () {
    currentSearchText = searchInput.value
    applyFilters()
})