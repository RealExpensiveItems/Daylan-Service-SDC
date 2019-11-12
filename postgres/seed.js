//const ReviewList = require ('./schema.sql');

const scaledGenerator = require('./scaledata.js')
var heapdump = require('heapdump');
const fs = require('fs')



let mdata = scaledGenerator(1);

// var csvWriter = require('csv-write-stream')
// var writer = csvWriter()
//var info = fs.createWriteStream('test.csv')
var comments = fs.createWriteStream('restcomments.csv')

var i = 0;

// function write() {
//   var ok = true;
//   var start = new Date()
//   console.log(start)
//   do {
//     i++;
//     var newData = scaledGenerator(1);
//     newData['id'] = i
//     if (i === 10000000) {
//       console.log(new Date())
//       writer.pipe(info)
//       writer.write(newData.user)
//       writer.end()
//     } else {
//       ok = writer.write(newData.user)

//     }
//   }
//   while (i < 10000000);
//   if (i < 10000000) {
//     writer.pipe(info)
//     writer.write(newData.user)
//     info.once('drain', write)
//   }
// }



// function write1() {
//   var ok = true;
//   // var start = new Date()
//   // console.log(start)

//   do {
//     i++;
//     var newData = scaledGenerator(1);
//     delete newData["user"]

//     if (i === 100000000) {
//       console.log(new Date())

//       writer.pipe(comments)
//       writer.write(newData)
//       writer.end()
//     } else {
//       ok = writer.write(newData)
//     }
//   }
//   while (i < 100000000);
//   if (i < 1000000) {
//     // writer.pipe(comments)
//     // writer.write(newData)
//     writer.once('drain', write1)
//   }
// }





var i = 0;

function write1() {
  var ok = true;
  if (i % 100000 === 0) {
    console.log(new Date())
  }

  comments.write('reviewID* restaurantID* starRating* comments* ordered* date' + '\n')
  do {
    i++;
    var newData = scaledGenerator(1);

    if (i === 10000000) {
      console.log(new Date())
      comments.write((newData), 'utf8', () => {comments.end()})
    } else {
      ok = comments.write((newData), 'utf8')
    }
  }
  while (i <61000 && ok);
  if (i < 61000) {
    comments.once('drain', write1)
  }
}





//node --max-old-space-size=8192 seed.js
write1();
//write();

