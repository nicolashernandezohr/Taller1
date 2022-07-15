const {Pool} = require('pg');

const pool = new Pool({
    user:'postgres',
    host:process.env.HOST,
    database:process.env.DATABASE,
    password:process.env.PASSWORD,
    port:process.env.PORTDB
});

module.exports = pool;

