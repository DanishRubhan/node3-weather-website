const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=786c554e6d44a5a8be77718b8aacf8e6&query=' + latitude + ',' + longitude + ' &units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to Weather App!!", undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out . It feelis like ' + body.current.feelslike + ' degrees out . Humidity is about ' + body.current.humidity + ' degrees.')
        }
    })
}
module.exports = forecast