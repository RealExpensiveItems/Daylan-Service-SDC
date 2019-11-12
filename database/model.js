const mongoose = require('mongoose');
const db = require('./index.js')

const reviewSchema = new mongoose.Schema({
reviewID: Number,
restaurantID: Number,
user: {
    firstName: String,
    firstLetter: String,
    numOfRatings: Number,
    topReviewer: Boolean,
    },
starRating: Number,
comments: String,
date: Date,
Ordered: [{type: String}]
})

const ReviewList = mongoose.model('reviewLists', reviewSchema);

module.exports = ReviewList;