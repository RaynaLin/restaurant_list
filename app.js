// packages and environment
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.use(bodyParser.urlencoded({ extended: true }))

// connect to mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// mongoose connection status
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

// view all restaurants
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// search
app.get('/search', (req, res) => {

  const keyword = req.query.keyword
  Restaurant.find({})
    .lean()
    .then(restaurants => {
      restaurant_tmp = restaurants.filter(restaurants =>
        restaurants.name.toLowerCase().includes(keyword.toLowerCase())
      )
      res.render('index', { restaurants: restaurant_tmp })
    })
    .catch(error => console.log(error))
})

// Create
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const nameCH = req.body.nameCH
  const nameEN = req.body.nameEN
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const map = req.body.map
  const rating = req.body.rating
  const description = req.body.description

  return Restaurant.create({
    name: nameCH,
    name_en: nameEN,
    category: category,
    image: image,
    location: location,
    phone: phone,
    google_map: map,
    rating: rating,
    description: description,
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Read
app.get('/restaurants/:restaurant_id', (req, res) => {
  // console.log('req.params.restaurant_id', req.params)
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurants => res.render('show', { restaurants }))
    .catch(error => console.log(error))
})

// Updata

app.get("/restaurants/:restaurant_id/edit", (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
})

app.post("/restaurants/:restaurant_id/edit", (req, res) => {
  const id = req.params.restaurant_id
  const nameCH = req.body.nameCH
  const nameEN = req.body.nameEN
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const map = req.body.map
  const rating = req.body.rating
  const description = req.body.description

  Restaurant.findByIdAndUpdate(id, {
    name: nameCH,
    name_en: nameEN,
    category: category,
    image: image,
    location: location,
    phone: phone,
    google_map: map,
    rating: rating,
    description: description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Delete
app.post('/restaurants/:restaurant_id/delete', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})