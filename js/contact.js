const contactForm = document.getElementById("contactForm")
const contactNameInput = document.getElementById("contactName")
const contactEmailInput = document.getElementById("contactEmail")
const contactSubjectInput = document.getElementById("contactSubject")
const contactMessageInput = document.getElementById("contactMessage")

function clearContacterrors() {
    document.getElementById("contactNameError").textContent = ""
    document.getElementById("contactEmailError").textContent = ""
    document.getElementById("contactSubjectError").textContent = ""
    document.getElementById("contactMessageError").textContent = ""
}

function handleContactSubmit(event) {
    event.preventDefault()
    clearContacterrors()

    let isValid = true

    if (!validateName(contactNameInput.value)) {
        document.getElementById("contactNameError").textContent = "Please enter your name."
        isValid = false
    }

    if (!validateEmail(contactEmailInput.value)) {
        document.getElementById("contactEmailError").textContent = "Please enter a valid email."
        isValid = false
    }

    if (contactSubjectInput.value.trim() === "") {
        document.getElementById("contactSubjectError").textContent = "Please enter a subject."
        isValid = false
    }

    if (contactMessageInput.value.trim() === "") {
        document.getElementById("contactMessageError").textContent = "Please write a message."
        isValid = false
    }

    if (!isValid) {
        return
    }

    showNotification("We've recieved your message and will get back to you soon.")
    contactForm.reset()
}
contactForm.addEventListener("submit", handleContactSubmit)