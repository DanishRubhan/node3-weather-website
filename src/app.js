const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//path
const publicdirectorypath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../template/views')
const partialspath = path.join(__dirname, '../template/partials')

app.use(express.static(publicdirectorypath))
//folder
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

// app.get('/help', (req, res) => {
//     res.render('help.html')
// })

// app.get('/about', (req, res) => {
//     res.render('about.html')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Danish Rubhan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About this website',
        name: 'Danish Rubhan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        help: 'I am here to help',
        name: 'Danish Rubhan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Unable to search Address!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'No items searched!!'
        })
    }
    res.send({
        products: [req.query.search]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Article Error',
        error: 'help article not found',
        name: 'Danish Rubhan'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        error: 'this is 404 page!',
        name: 'Danish Rubhan'
    })
})

app.listen(3000, () => {
    console.log("Listening to port 3000")
})