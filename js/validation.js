function validateName(name) {
    return name.trim() !== ""
}

function validateAge(age) {
    const numAge = Number(age)
    return age !== "" && numAge >= 1 && numAge <= 120
}

function validatePhone(phone) {
    return /^[0-9]{10}$/.test(phone)
}

function validateEmail(email) {
    return email.includes("@") && email.includes(".")
}

function validateSymptoms(symptoms) {
    return symptoms.trim() !== ""
}

function validateDate(dateValue) {
    if (dateValue === "") {
        return {valid: false, message: "Please select a date."}
    }

    const selectedDate = new Date(dateValue)
    const today = new Date()

    today.setHours(0, 0, 0, 0)
    selectedDate.setHours(0, 0, 0, 0)

    if (selectedDate < today) {
        return {valid: false, message: "Please choose a future date."}
    }

    return {valid: true, message: ""}
}