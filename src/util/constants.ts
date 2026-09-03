export const defaultImagePrefix = 'https://image.tmdb.org/t/p/w500'
// `original` posters can be very large and repeatedly decoding them can leave
// mobile browsers with a blank image. This is still larger than a phone screen
// while keeping memory use predictable in the image viewer.
export const fullSizeImagePrefix = 'https://image.tmdb.org/t/p/w1280'

// this should be set to what you have in the Auto0 dashboard for your account
export const Auth0Settings = {
    "domain": "dev-ceheb30iacapg3o6.us.auth0.com",
    "clientId": "32KtsIrStNtSqVzAbrDlt9cTaS9BHX6J",
    "audience": "https://groover.tech/"
}
