function getUpcomingAppointment() {
    const bookings = getBookings()

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const upcoming = bookings.filter(function (booking) {
        const apptDate = new Date(booking.rawDate)
        apptDate.setHours(0, 0, 0, 0)
        return apptDate >= today
    })

    if (upcoming.length === 0) {
        return null
    }

    upcoming.sort(function (a, b){
        return new Date(a.rawDate) - new Date(b.rawDate)
    })
    return upcoming[0]
}

function getDaysUntilText(rawDate) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const apptDate = new Date(rawDate)
    apptDate.setHours(0, 0, 0, 0)

    const diffDays = Math.round((apptDate - today) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
        return "Today"
    }
    if (diffDays === 1) {
        return "Tomorrow"
    }
    return "in " + diffDays + " days"
}

function showRemainderBanner() {
    const appointment = getUpcomingAppointment()

    if (!appointment) {
        return
    }

    const dissmissedId = sessionStorage.getItem("dissmissedRemainderId")
    if (dissmissedId === appointment.id) {
        return
    }

    const banner = document.createElement("div")
    banner.id = "remainderBanner"
    banner.className = "remainder-banner"
    banner.innerHTML = `
        <p>
            📅 Upcoming appointment with <strong>${appointment.doctorName}</strong>
            on <strong>${appointment.date}</strong> at <strong>${appointment.time}
            </strong> (${getDaysUntilText(appointment.rawDate)})
        </p>
        <button id="dismissRemainderBtn" title="Dismiss">✕</button>
    `

    document.body.prepend(banner)

    document.getElementById("dismissRemainderBtn").addEventListener("click", function () {
        sessionStorage.setItem("dissmissedRemainderId", appointment.id)
        banner.remove()
    })
}
showRemainderBanner()