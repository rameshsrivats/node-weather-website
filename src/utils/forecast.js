const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a19816bc5f4091313f40f64a248647b9/' + latitude.toString() + ','  + longitude.toString() + '?units=si'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Could not connect to weather server')
        } else if (response.body.error) {
            callback('Location invalid for weather')
        } else {
            callback(undefined, {
                temperature: response.body.currently.temperature,
                rain: response.body.currently.precipProbability,
                summary: response.body.daily.data[0].summary
            })
        }
    })  
}

module.exports = forecast