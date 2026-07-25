const doctorsContainer = document.getElementById("doctorsContainer")

function getStars(rating) {
    const fullStars = Math.round(rating)
    let stars = ""
    for (let i = 0; i < 5; i++) {
        stars += i < fullStars? "★" : "☆"
    }
    return stars
}

function showDoctors(doctorsList) {
    doctorsContainer.innerHTML = ""
    if (doctorsList.length === 0) {
        doctorsContainer.innerHTML = `<p class="no-results">No doctors found.</p>`
        return
    }

    doctorsList.forEach(function (doctor) {
        const favClass = isFavourite(doctor.id) ? "fav-btn active" : "fav-btn"
        const card = `
            <div class="doctor-card">
                <button class="${favClass}" data-id="${doctor.id}" title="Toggle Favourite">♥</button>
                <img src="${doctor.image}" alt="${doctor.name}" class="doctor-img">
                <h3>${doctor.name}</h3>
                <p class="specialization">${doctor.specialization}</p>
                <p class="experience">${doctor.experience}</p>
                <p class="hospital">${doctor.hospital}</p>
                <p class="rating">${getStars(doctor.rating)}</p>
                <p class="fee">${doctor.fee}</p>
                <button class="btn-primary book-btn" data-id="${doctor.id}">
                    Book Appointment
                </button>
            </div>
        `
        doctorsContainer.innerHTML += card
    })
}

doctorsContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("book-btn")) {
        const doctorId = event.target.getAttribute("data-id")
        window.location.href = "appointment.html?doctorId=" + doctorId
    }

    if (event.target.classList.contains("fav-btn")) {
        const doctorId = Number(event.target.getAttribute("data-id"))
        toggleFavourite(doctorId)
        applyFilters()
    }
})

const loadingSpinner = document.getElementById("loadingSpinner")

function loadDoctors() {
    loadingSpinner.classList.remove("hidden")
    loadingSpinner.style.display = "block"
    doctorsContainer.classList.add("hidden")

    setTimeout(function() {
        showDoctors(doctors)

        loadingSpinner.classList.add("hidden")
        loadingSpinner.style.display = "none"
        doctorsContainer.classList.remove("hidden")
    }, 1000)
}
loadDoctors()