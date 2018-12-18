var epxress = require('express')
var app = epxress()

var fs = require('fs')
var _ = require('lodash')
var users = []

fs.readFile('users.json', { encoding: 'utf8' }, (err, data) => {
  if (err) throw err

  JSON.parse(data).forEach((user) => {
    user.name.full = _.startCase(user.name.first + ' ' + user.name.last)
    users.push(user)
  })
})

app.get('/', (req, res) => {
  var buffer = ''

  users.forEach((user) => {
    buffer += `<a href="/${user.username}">${user.name.full}</a><br>`
  })
  res.send(buffer)
})

// Route with regexp
// NOTE: the order of Routes is important
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
  var username = req.params.username
  res.send(username)
})

app.get('/bonsoir', (req, res) => {
  res.send('Bonsoir!')
})

var server = app.listen(3000, () => {
  console.log('Server running at http://localhost:' + server.address().port)
})
