const pg = require('pg');
const url = require('url');
require('dotenv').config()

let config = {};

if (process.env.DATABASE_URL) {
  // Heroku gives a url, not a connection object
  // https://github.com/brianc/node-pg-pool
//   const params = url.parse(process.env.DATABASE_URL);
//   const auth = params.auth.split(':');

  // This configuration connects to the database in AWS called ' pretslonboardingapptest '

  config = {
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'template-shop-users',
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
};
// this creates the pool that will be shared by all other modules
const pool = new pg.Pool(config);


// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;