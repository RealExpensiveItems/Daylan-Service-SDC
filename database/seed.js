const generator = require ('./mockdata.js');
const ReviewList = require ('./model.js');

let myData = scaledGenerator(1000000);
let mdata = scaledGenerator(1);


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

const seeder = () => {
  ReviewList.insertMany(myData)
    .then(() => console.log('Success adding data to database!'))
    .catch(err => console.log(err))
}

seeder();