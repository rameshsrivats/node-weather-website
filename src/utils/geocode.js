const request = require('request')

const geoCode = (address, callback) => {
    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicmFtZXNoc3JpdmF0cyIsImEiOiJjanQ3NnVhb2EwOXJnNDRsNWMzaDJ6a213In0.ULobzyeZTTnz2McV4-yQvQ&limit=1'
    request({url: geoURL, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to geo data', undefined)
        } else if (response.body.features.length === 0) {
            callback('Could not find location', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode