const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectory = path.join( __dirname, '../public' )
const viewsDirectory = path.join(__dirname,'../templates/views')
const partialsDirectory = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set( 'view engine', 'hbs' )
app.set( 'views', viewsDirectory )
hbs.registerPartials( partialsDirectory, function(err){} )

//Setup static directory to serve
app.use( express.static(publicDirectory) )

app.get('', (req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name : 'MoonYooSubs'
    })
})

// app.get( '/product', (req, res)=>{

//     if ( !req.query.search ){
//         return res.send( {
//             error : 'You must provide a search term'
//         })
//     }

//     console.log( req.query.search );
//     res.send({
//         product : []
//     })
// })

app.get('/about', (req,res)=>{
    res.render('about',{
        title : 'About Me',
        name : 'MoonYooSubs'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title : 'Help Page',
        name : 'MoonYooSubs',
        helpText : 'This is some helpful text'
    })
})

app.get('/weather', (req, res)=>{

    if ( !req.query.address ){
        return res.send({error:'You must provide a address!'})
    }

    geocode( req.query.address, (error, { latitude, longtitude, location } = {} )=>{
    
        if ( error ){
            return res.send({error})
        }
    
        forecast( latitude, longtitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
    
            res.send({
                forecastData,
                location,
                address : req.query.address
            })
        })
    })    


    // /weather
    // /weather?address=philadelphia
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: '404 Page',
        name : 'MoonYooSubs',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title : '404 Page',
        name : 'MoonYooSubs', 
        errorMessage : 'Page not found!'
    })
})

app.listen( 3000, ()=>{
    console.log('Server is up on port 3000.')
})