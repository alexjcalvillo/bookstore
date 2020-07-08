const pg = require('pg');

//
// CONFIGURE DB POOL OBJ
// ---------------------
const Pool = pg.Pool;
const pool = new Pool({
  database: 'bookstore_activity',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
});

pool.on('connect', () => {
  console.log('Connected to DB');
});

pool.on('error', () => {
  console.log('Postgres error -', error);
});

module.exports = pool;
