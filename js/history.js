const HISTORY_KEY = "appointmentHistory"

function getBookings() {
    const stored = localStorage.getItem(HISTORY_KEY)
    return stored ? JSON.parse(stored) : []
}

function saveBookings(bookingsArray) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(bookingsArray))
}

function addBooking(booking) {
    const bookings = getBookings()
    bookings.unshift(booking)
    saveBookings(bookings)
}

function removeBooking(bookingId) {
    let bookings = getBookings()
    bookings = bookings.filter(function (booking) {
        return booking.id !== bookingId
    })
    saveBookings(bookings)
}

function clearBookings() {
    saveBookings([])
}