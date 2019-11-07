const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/reviews", {useNewUrlParser: true});

// `mongodb+srv://hackreactortest:${process.env.DBPASSWORD}@cluster0-ihnwo.mongodb.net/test?retryWrites=true&w=majority`

const db = mongoose.connection;
db.once('open', ()=> console.log("Database is up and running on 27017"))

module.exports = db;