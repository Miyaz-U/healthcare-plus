const doctorSelect = document.getElementById("doctorSelect")
const dateInput = document.getElementById("appointmentDate")

const historyContainer = document.getElementById("historyContainer")
const clearHistoryBtn = document.getElementById("clearHistoryBtn")

function populateDoctorDropdown() {
    doctors.forEach(function (doctor) {
        const option = document.createElement("option")
        option.value = doctor.id
        option.textContent = doctor.name + " - " + doctor.specialization
        doctorSelect.appendChild(option)
    })
}
populateDoctorDropdown()

function preselectDoctorFromURL() {
    const params = new URLSearchParams(window.location.search)
    const doctorId = params.get("doctorId")

    if (doctorId) {
        doctorSelect.value = doctorId
    }
}
preselectDoctorFromURL()

const timeSlotSelect = document.getElementById("timeSlot")

function populateTimeSlots(doctorId) {
    timeSlotSelect.innerHTML = ""

    if (!doctorId) {
        timeSlotSelect.innerHTML = `<option value="">Select a doctor first</option>`
        timeSlotSelect.disabled = true
        return
    }

    const selectedDoctor = doctors.find(function (doctor) {
        return doctor.id === Number(doctorId)
    })

    if (!selectedDoctor || selectedDoctor.availableSlots.length === 0) {
        timeSlotSelect.innerHTML = `<option value="">No slots available</option>`
        timeSlotSelect.disabled = true
        return
    }

    timeSlotSelect.disabled = false
    timeSlotSelect.innerHTML = `<option value="">Select a Time</option>`

    selectedDoctor.availableSlots.forEach(function (slot) {
        const option = document.createElement("option")
        option.value = slot
        option.textContent = slot
        timeSlotSelect.appendChild(option)
    })
}

doctorSelect.addEventListener("change", function () {
    populateTimeSlots(doctorSelect.value)
})

populateTimeSlots(doctorSelect.value)

function setMinDate() {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, "0")
    const dd = String(today.getDate()).padStart(2, "0")
    dateInput.min = yyyy + "-" + mm + "-" + dd
}
setMinDate()

const appointmentForm = document.getElementById("appointmentForm")
const summaryBox = document.getElementById("appointmentSummary")

const patientNameInput = document.getElementById("patientName")
const ageInput = document.getElementById("age")
const genderInput = document.getElementById("gender")
const phoneInput = document.getElementById("phone")
const emailInput = document.getElementById("email")
const timeSlotInput = document.getElementById("timeSlot")
const symptomsInput = document.getElementById("symptoms")

function setError(id, message) {
    document.getElementById(id).textContent = message
}

function clearAllErrors() {
    setError("nameError", "")
    setError("ageError", "")
    setError("phoneError", "")
    setError("emailError", "")
    setError("dateError", "")
    setError("symptomsError", "")
}

function renderHistory() {
    const bookings = getBookings()

    if (bookings.length === 0) {
        historyContainer.innerHTML = `<p class="no-results">No appointments booked yet</p>`
        return
    }

    historyContainer.innerHTML = ""

    bookings.forEach(function (booking) {
        const card = `
            <div class="history-card">
                <div class="history-info">
                    <h4>${booking.doctorName}</h4>
                    <p>${booking.specialization}</p>
                    <p><strong>${booking.date}</strong> at ${booking.time}</p>
                    <p class="history-patient">Patient: ${booking.patientName}</p>
                </div>
                <button class="remove-history-btn" data-id="${booking.id}" title="Remove">✕</button>
            </div>
        `
        historyContainer.innerHTML += card
    })
}

historyContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-history-btn")) {
        const bookingId = event.target.getAttribute("data-id")
        removeBooking(bookingId)
        renderHistory()
    }
})

clearHistoryBtn.addEventListener("click", function () {
    clearBookings()
    renderHistory()
})

renderHistory()

function bookAppointment(event) {
    event.preventDefault()
    clearAllErrors()

    let isValid = true

    if (!validateName(patientNameInput.value)) {
        setError("nameError", "Please enter your name.")
        isValid = false
    }

    if (!validateAge(ageInput.value)) {
        setError("ageError", "Age must be between 1 and 120.")
        isValid = false
    }

    if (!validatePhone(phoneInput.value)) {
        setError("phoneError", "Phone number must be exactly 10 digits.")
        isValid = false
    }

    if (!validateEmail(emailInput.value)) {
        setError("emailError", "Please enter a valid email address.")
        isValid = false
    }

    const dateCheck = validateDate(dateInput.value)
    if (!dateCheck.valid) {
        setError("dateError", dateCheck.message)
        isValid = false
    }

    if (!validateSymptoms(symptomsInput.value)) {
        setError("symptomsError", "Please describe your symptoms.")
        isValid = false
    }

    if (!doctorSelect.value) {
        isValid = false
        alert("Please select a doctor.")
    }

    if (!isValid) {
        return
    }

    const selectedDoctor = doctors.find(function (doctor) {
        return doctor.id === Number(doctorSelect.value)
    })

    const formattedDate = new Date(dateInput.value).toLocaleDateString("en-GB", {day: "numeric", month: "long", year: "numeric"})

    summaryBox.innerHTML = `
        <h3>Appointment Confirmed!</h3>
        <p><strong>Doctor:</strong> ${selectedDoctor.name} (${selectedDoctor.specialization})</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${timeSlotInput.value}</p>
        <p><strong>Patient:</strong> ${patientNameInput.value}</p>
    `
    summaryBox.classList.remove("hidden")

    const newBooking = {
        id: Date.now().toString(),
        doctorName: selectedDoctor.name,
        specialization: selectedDoctor.specialization,
        date: formattedDate,
        rawDate: dateInput.value,
        time: timeSlotInput.value,
        patientName: patientNameInput.value
    }
    addBooking(newBooking)
    renderHistory()

    showNotificationAppointment("Thank you! Your appointment has been confirmed.")

    appointmentForm.reset()
}

appointmentForm.addEventListener("submit", bookAppointment)