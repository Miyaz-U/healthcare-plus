const notification = document.getElementById("notification")

function showNotificationAppointment(message) {
    notification.innerHTML = `
        <strong>✔️ Appointment Booked Successfully</strong>
        <p>${message}
    `
    notification.classList.remove("hidden")
    notification.classList.add("show")

    setTimeout(function () {
        notification.classList.remove("show")
        notification.classList.add("hidden")
    }, 3000)
}

function showNotificationContact(message) {
    notification.innerHTML = `
        <strong>✔️ Message Sent Successfully</strong>
        <p>${message}
    `
    notification.classList.remove("hidden")
    notification.classList.add("show")

    setTimeout(function () {
        notification.classList.remove("show")
        notification.classList.add("hidden")
    }, 3000)
}
