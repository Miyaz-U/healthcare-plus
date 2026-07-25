const FAVOURITES_KEY = "favouriteDoctors"

function getFavourites () {
    const stored = localStorage.getItem(FAVOURITES_KEY)
    return stored ? JSON.parse(stored) : []
}

function saveFavourites(favouritesArray) {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favouritesArray))
}

function isFavourite(doctorId) {
    const favourites = getFavourites()
    return favourites.includes(doctorId)
}

function toggleFavourite(doctorId) {
    let favourites = getFavourites()

    if (favourites.includes(doctorId)) {
        favourites = favourites.filter(function (id) {
            return id !== doctorId
        })
    } else {
        favourites.push(doctorId)
    }

    saveFavourites(favourites)
}