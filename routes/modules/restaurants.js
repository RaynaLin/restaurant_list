// load packages and router
const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')


// Create
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description
  } = req.body

  return Restaurant.create({
    name: name,
    name_en: name_en,
    category: category,
    image: image,
    location: location,
    phone: phone,
    google_map: google_map,
    rating: rating,
    description: description,
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Read
router.get('/:restaurant_id', (req, res) => {
  // console.log('req.params.restaurant_id', req.params)
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurants => res.render('show', { restaurants }))
    .catch(error => console.log(error))
})

// Updata

router.get("/:restaurant_id/edit", (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
})

router.put("/:restaurant_id", (req, res) => {
  const id = req.params.restaurant_id
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description
  } = req.body

  Restaurant.findByIdAndUpdate(id, {
    name: name,
    name_en: name_en,
    category: category,
    image: image,
    location: location,
    phone: phone,
    google_map: google_map,
    rating: rating,
    description: description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Delete
router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router