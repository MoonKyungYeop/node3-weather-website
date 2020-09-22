const request = require('request')

const geocode = (address, callback)=>{
    const uri = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent( address )}.json?access_token=pk.eyJ1IjoieW9vc3Vic21vb24iLCJhIjoiY2tlc29za3lnMW80djJ6cG5rMnI0b3d4bCJ9.OGIgQGBQCFtYX8Zi_rcKDw&limit=1`
    request({ uri, json : true }, (error, {body})=>{
        if ( error ){
            callback( 'unable to connect location services.', undefined )
        }else if ( body.features.length === 0 ){
            callback('unable to find location. Trying other search', undefined )
        }else{
            callback( undefined, {
                latitude : body.features[0].center[0],
                longtitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode