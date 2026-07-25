const teamContainer = document.getElementById("teamContainer")

function showTeam() {
    doctors.forEach(function (doctor) {
        const card = `
            <div class="team-card">
                <img src="${doctor.image}" alt="${doctor.name}" class="team-img">
                <h3>${doctor.name}</h3>
                <p class="specialization">${doctor.specialization}</p>
                <p class="experience">${doctor.experience}</p>
            </div>
        `
        teamContainer.innerHTML += card
    })
}
showTeam()