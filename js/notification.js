const notification = document.getElementById("notification")

function showNotification(message) {
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