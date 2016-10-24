const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

/*** Logger ***/
app.use((req, res, next) => {
  var now = new Date().toString()
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n')
  next()
})

/*** Maintenance ***/
app.use((req, res, next) => {
  res.render('maintenance.hbs')
})

/*** Static ***/
app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('screamIt', (text) => text.toUpperCase())

app.get('/', (req, res) => {
  res.render('home.hbs', {
    welcomeMessage: 'Welcome to my page!',
    pageTitle: 'Home Page'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})