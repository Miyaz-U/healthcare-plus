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