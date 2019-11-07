const generator = require ('./mockdata.js');
const ReviewList = require ('./model.js');

const scaledGenerator = require('./scaledata.js')
var heapdump = require('heapdump');
const fs = require('fs')
//const test = __dirname + '/../database/test.json'

// let myData = scaledGenerator(1000);

// const seeder = () => {
//   ReviewList.insertMany(myData)
//     .then(() => console.log('Success adding data to database!'))
//     .catch(err => console.log(err))
// }

// seeder();


let myData = scaledGenerator(1000000);
let mdata = scaledGenerator(1);


// const seeder = () => {
//   for (var i = 0; i < 5; i++) {
//     ReviewList.insertMany(scaledGenerator(1))
//       //.then(() =>ReviewList.insertMany(scaledGenerator(1)))
//       .then(() => console.log(process))
//       .catch(err => console.log(err))
//   }
// }

// seeder()
// var arr = [];


// function writeTen(writer, data, encoding, cb) {
//   var i = 1

//   write()
//   function write() {
//     var ok = true;

//     do {
//       i++;
//       var newData = scaledGenerator(1);
//       if (i === 4) {
//         arr.push(writer.write(data, encoding, cb))
//       } else {
//         ok = writer.write(data, encoding)
//       }
//     }
//     while (i < 4 && ok);
//     if (i < 4) {
//       writer.once('drain', write)
//     }
//   }
// }


// writeTen(fs.createWriteStream('test.json', 'utf-8'), JSON.stringify(mdata), 'utf-8', () => {
//   (fs.write(10, 'utf-8')).end()
// })


// for (var i = 0; i < 10; i++) {
//   writeTen(fs.createWriteStream('test.json', 'utf-8'), JSON.stringify(scaledGenerator(1)), 'utf-8', () => {
//     (fs.writeFile(8, mdata)).end()
//   })

// }

//seeder()


// let myData = generator(1000);

// const seeder = () => {
//   ReviewList.insertMany(myData)
//     .then(() => console.log('Success adding data to database!'))
//     .catch(err => console.log(err))
// }

// seeder();

const jsonStream = fs.createWriteStream('test.json');

var i = 0;

function write() {
  var ok = true;

  do {
    i++;
    var newData = scaledGenerator(1);
    newData['id'] = i
    if (i === 10000000) {
      jsonStream.write(JSON.stringify(newData), 'utf8', () => {jsonStream.end()})
    } else {
      ok = jsonStream.write(JSON.stringify(newData), 'utf8')
    }
  }
  while (i < 10000000 && ok);
  if (i < 10000000) {
    jsonStream.once('drain', write)
  }
}

write();