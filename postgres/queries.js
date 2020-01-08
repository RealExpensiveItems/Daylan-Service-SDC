const {Pool, Client} = require('pg')

//change user to daylanberry for local host
//change user to postgres for ec2
const pool = new Pool({
  user: 'daylanberry',
  host: 'localhost',
  database: 'userreviews',
  max: 10,
})

const client = new Client({
  user: 'daylanberry',
  host: 'localhost',
  database: 'userreviews',
  max: 10,
})

client.connect(err => {
  if (err) {
    console.error('connection error, err.stack')
  } else {
    console.log('client connected')
  }
})


pool.connect((err, client, release) => {

  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows)
  })
  console.log('pool connected')
})



module.exports = {pool, client}