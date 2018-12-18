var epxress = require('express')
var app = epxress()

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.get('/bonsoir', (req, res) => {
  res.send('Bonsoir!')
})

var server = app.listen(3000, () => {
  console.log('Server running at http://localhost:' + server.address().port)
})
