const express = require('express')
const engines = require('consolidate')
const app = express()

const fs = require('fs')
const _ = require('lodash')
const users = []

fs.readFile('users.json', { encoding: 'utf8' }, (err, data) => {
  if (err) throw err

  JSON.parse(data).forEach((user) => {
    user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
    users.push(user)
  })
})

app.engine('hbs', engines.handlebars)

app.set('vews', './views')
app.set('view engine', 'hbs')

app.use('/users-images', express.static('images'))

app.get('/', (req, res) => {
  // I can also say Index.jade in order to force rendering the jade one
  res.render('index', { users })
})

// NOTE: the order of Routes is important
// Route with regexp
app.get(/big.*/, (req, res, next) => {
  console.log('BIG USER ACCESS')
  next()
})

app.get(/.*dog.*/, (req, res, next) => {
  console.log('DOGS GO WOOF')
  next()
})

// Route with param
app.get('/:username', (req, res) => {
  const username = req.params.username
  res.render('user', { username })
})

const server = app.listen(3000, () => {
  console.log('Server running at http://localhost:' + server.address().port)
})
