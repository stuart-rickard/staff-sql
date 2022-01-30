const { askUserFor, askUserToSelect, askUserToDecide } = require( './lib/obtain-user-input' );
const { connectDB, viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require( './lib/db-utils' );

const openingOptions = [ 'view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'quit' ]

const introMessage = () => {
    const intro = `
Welcome to the Employee Tracker!
----Use ^C at any time to quit.
`;
    console.log(intro);        
}

const runEmployeeTracker = async function() {
    await connectDB();
    introMessage();
    switch ( await askUserToSelect( 'one of the following', openingOptions ) ) {
        case 'view all departments':
            viewDepartments()
            break;
        case 'view all roles':
            viewRoles();
            break;
        case 'view all employees':
            viewEmployees();
            break;
        case 'add a department':
            addDepartment();
            break;
        case 'add a role':
            addRole();
            break;
        case 'add an employee':
            addEmployee();
            break;
        case 'update an employee role':
            updateEmployeeRole();
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

