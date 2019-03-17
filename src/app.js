const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const pubdirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static dir to serve
app.use(express.static(pubdirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ramesh Srivats'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ramesh Srivats'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ramesh Srivats',
        message: 'Some helful message'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'An address must be provided'
        })
    }
    geoCode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error: error
            })
        } 
        forecast(data.latitude, data.longitude, (error, wdata) => {
            if (error) {
                return res.send({
                    error: error
                })
            } 
            const forecast = `${wdata.summary} It is ${wdata.temperature} degrees with a ${wdata.rain}% chance of rain`
            res.send({
                forecast,
                location:data.location,
                address: req.query.address
            })     
        })  
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ramesh Srivats',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ramesh Srivats',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})