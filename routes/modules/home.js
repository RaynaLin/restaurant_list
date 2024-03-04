const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {

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

module.exports = router
