const Pool = require('pg').Pool;
require('dotenv').config();

const devConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
};

// const pool = new Pool({
//   user: 'postgres',
//   password: '',
//   host: 'localhost',
//   port: 5432,
//   database: 'travis'
// });

const proConfig = {
  connectionString: process.env.DATABASE_URL
};

const pool = new Pool(process.env.NODE_ENV === 'production' ? proConfig : devConfig);

// const pool = new Pool(devConfig);

module.exports = pool;
