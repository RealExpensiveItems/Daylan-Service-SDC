const express = require('express')
const path = require('path');
const db = require('../database/index.js');
const ReviewList = require ('../database/model.js');
const cors = require('cors');
const expressStaticGzip = require("express-static-gzip");

const app = express()
const port = process.env.PORT || 3200;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//serve static files
// app.use('/restaurants/:restaurantID', express.static(path.join(__dirname, '../public')))
// app.use('/restaurants/reviews_footer', express.static(path.join(__dirname, '../public')))


app.use(express.static(path.join(__dirname, '../public')))



//Serve compressed bundle.js
app.use('/restaurants/reviews_footer', expressStaticGzip(path.join(__dirname, '../public'), {
	enableBrotli: true,
	orderPreference: ['br', 'gz']
}));

app.get('/restaurants/api/reviews/:restaurantID', (req, res) => {
  const {restaurantID} = req.params;
  //GET data for one restaurant; i.e. send data back where {restaurantID : restaurantID}
  ReviewList.find({restaurantID: restaurantID})
    .then(data => res.status(200).send(data))
    .catch(err => res.status(404).send(err));
})

//for any id
// app.get('/restaurants/api/review/:id', (req, res) => {
//   const {id} = req.params;

//   ReviewList.find({id: id})
//     .then((data) => res.status(200).send(data))
//     .catch(err => res.status(404).send(err));
// })


//for testing, last 10% of id's
app.get('/restaurants/api/review', (req, res) => {
  const id = Math.floor(Math.random() * 1000000) + 900000

  ReviewList.findOne({id: id})
    .then((data) => res.status(200).send(data))
    .catch(err => res.status(404).send(err));
})



// app.get('/restaurants/api/reviewer/:starRating', (req, res) => {
//   const {starRating} = req.params;
//   const restID = Math.floor(Math.random() * 100)
//   const randomSkip = Math.floor(Math.random() * 100)

//   ReviewList.find({starRating: starRating, restaurantID: restID}).limit(10).skip(randomSkip)
//     .then((data) => res.status(200).send(data))
//     .catch(err => res.status(404).send(err));
// })

//randomized star rating search
app.get('/restaurants/api/reviewer/:starRating', (req, res) => {
  const {starRating} = req.params;

  function getMaxAndMin(min, max) {
    var start = Math.floor(Math.random() * (max - min) + min);
    return [start, Math.floor(Math.random() * (10000000 - start)) + start]
  }

  var arr = getMaxAndMin(0, 10000000)

  ReviewList.find({starRating: starRating, id: {$gt: arr[0], $lt: arr[1]}}).limit(10)
    .then((data) => res.status(200).send(data))
    .catch(err => res.status(404).send(err));
})



// app.get('/restaurants/api', (req, res) => {
//   const {_id} = req.query;

//   ReviewList.find({ _id})
//     .then((data) => res.status(200).send(data))
//     .catch(err => res.status(404).send(err));
// })

//http://localhost:3200/restaurants/api?_id=5dbdf9e9ce660656cb0056f4





app.post('/restaurants/api/reviews', (req, res) => {

  const {Ordered, user, reviewID, restaurantID, starRating, comments, date} = req.body;

  ReviewList.create({Ordered, user, reviewID, restaurantID, starRating, comments, date})
    .then(() => res.status(201).send('Success posting review'))
    .catch(err => res.status(404).send(err));
})


app.listen(port, () => console.log(`App is listening on port ${port}!`))