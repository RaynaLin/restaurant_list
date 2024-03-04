// load packages
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

require('./config/mongoose')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

// setting override
app.use(methodOverride('_method'))

// setting routes
app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})