const request = require('request')

const forecast = (latitude, longtitude, callback)=>{
    const uri = `http://api.weatherstack.com/current?access_key=7c958e418f51b7e2662f368209430d5f&query=${longtitude},${latitude}&units=m`
    request( {uri, json : true}, (error, {body})=>{
        if ( error ){
            callback( 'Unable to connect to weather service!', undefined )
        }else if ( body.error ){
            callback( 'Unable to find location', undefined )
        }else{
            callback( undefined, `${body.current.weather_descriptions[0]}. It is currently ${ body.current.temperature } degree out. It feels like ${ body.current.feelslike } degress out. The humidity is  ${body.current.humidity}%.`)
        }
    })
}

module.exports = forecast
