const {Pool} = require('pg');

/*const pool = new Pool({
    user:'postgres',
    host:process.env.HOST,
    database:process.env.DATABASE,
    password:process.env.PASSWORD,
    port:process.env.PORTDB
});
*/

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'taller1',
    password:'1234',
    port:process.env.PORTDB
});


module.exports = pool;

