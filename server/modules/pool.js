const pg = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const url = require('url');

dotenv.config({
  path: path.join(__dirname, './config.env'),
});

const Pool = pg.Pool;
const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');

console.log('user', auth[0], 'pw', auth[1]); //confirm user and pw for database parsed correctly

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
}; //see readme on what to do to set this up if unsure

const pool = new Pool(config);

pool.on('connect', () => {
  console.log('Connected to database...');
});

pool.on('error', (e) => {
  console.error('Error from pool', e);
});

module.exports = pool;
