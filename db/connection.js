const mysql = require( 'mysql2' );
const { mysqlPW } = require( '../git_ignored' );

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: mysqlPW(),
  database: 'staff_12'
});

module.exports = db;
