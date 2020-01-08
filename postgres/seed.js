//const ReviewList = require ('./schema.sql');

const scaledGenerator = require('./scaledata.js')
const scaledUserGenerator = require('./scale-user-data.js')
var heapdump = require('heapdump');
const fs = require('fs')



let mdata = scaledGenerator(1);

var info = fs.createWriteStream('test.csv')
var comments = fs.createWriteStream('restcomments.csv')

var i = 0;

function write() {
  var ok = true;
  if (i % 100 === 0) {
    console.log(new Date())
  }

  info.write('firstName* firstLetter* numOfRatings* topReviewer' + '\n')

  do {
    i++;
    var newData = scaledUserGenerator(1);

    if (i === 10000000) {
      console.log(new Date())
      info.write((newData), 'utf8', () => {info.end()})
    } else {
      ok = info.write((newData), 'utf8')
    }
  }
  while (i <10000000 && ok);
  if (i < 10000000) {
    info.once('drain', write)
  }
}


var j = 0;

function write1() {
  var ok = true;
  if (j % 100000 === 0) {
    console.log(new Date())
  }

  comments.write('reviewID* restaurantID* starRating* comments* ordered* date' + '\n')
  do {
    j++;
    var newData = scaledGenerator(1);

    if (j === 9800000) {
      console.log(new Date())
      comments.write((newData), 'utf8', () => {comments.end()})
    } else {
      ok = comments.write((newData), 'utf8')
    }
  }
  while (j <9800000 && ok);
  if (j < 9800000) {
    comments.once('drain', write1)
  }
}





//node --max-old-space-size=8192 seed.js
write1();
write();

