const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 2223;
const {pool, client} = require('../postgres/queries.js')


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/restaurants/api/reviews/:id', (req, res) => {
  // res.json({info: "postgres"})
  var {id} = req.params

  pool.query(`SELECT * FROM users INNER JOIN reviews ON users.id = reviews.id WHERE users.id = ${id};`)
  .then((result) => res.status(200).send(result.rows))
  .catch((err) => console.log(err))
})

app.get('/restaurants/api/review', (req, res) => {

  var id = Math.floor(Math.random() * 980000) + 8000000


  pool.query(`SELECT * FROM users INNER JOIN reviews ON users.id = reviews.id WHERE users.id BETWEEN ${id - 5} AND ${id};`)
  .then((result) => res.status(200).send(result.rows))
  .catch((err) => console.log(err))
})

app.get('/loaderio-155d8b4d228eaede9862626dfd6ba987/', (req, res) => {

    res.status(200).send('loaderio-155d8b4d228eaede9862626dfd6ba987')

})




app.listen(port, () => console.log('now listening on port ' + port))