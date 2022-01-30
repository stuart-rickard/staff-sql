const { askUserFor, askUserToSelect, askUserToDecide } = require( './lib/obtain-user-input' );
const db = require('./db/connection');
const cTable = require('console.table');

const openingOptions = [ 'view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'quit' ]

const introMessage = () => {
    const intro = `
    Welcome to the Employee Tracker!
    ----Use ^C at any time to quit.
    ----Let's get started!`;
    console.log(intro);        
}

const printEmployees = () => {
    const sql = `SELECT * FROM employees`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log( err );
        return;
      }
      console.table(rows);
    });
};


const runEmployeeTracker = async function() {
    await db.connect(err => {
        if (err) throw err;
        console.log('Employee database connected.');
      });
    introMessage();
    switch ( await askUserToSelect( 'one of the following', openingOptions ) ) {
            case 'view all departments':
            break;
        case 'view all roles':
            break;
        case 'view all employees':
            printEmployees();
            break;
        case 'add a department':
            break;
        case 'add a role':
            break;
        case 'add an employee':
            break;
        case 'update an employee role':
            break;
        case 'quit':
            break;
        default:
            throw err;


    // const team = new Team;
    // await team.populateStaff();
    // await saveHTML( createHTML( team.staff ), filename ) 
    //     .then( writeFileResponse => {
    //         console.log( writeFileResponse.message );
    //     })
    // let proceed = await askUserToConfirm( 'Open Team Profile in Chrome?' );
    // if (proceed) {
    //     openChrome(  __dirname, filename );
    // }
}};

runEmployeeTracker()

