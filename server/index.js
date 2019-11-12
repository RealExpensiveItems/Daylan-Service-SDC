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

app.post('/restaurants/api/reviews', (req, res) => {
  
  const {Ordered, user, reviewID, restaurantID, starRating, comments, date} = req.body;

  ReviewList.create({Ordered, user, reviewID, restaurantID, starRating, comments, date})
    .then(() => res.status(201).send('Success posting review'))
    .catch(err => res.status(404).send(err));
})


app.listen(port, () => console.log(`App is listening on port ${port}!`))