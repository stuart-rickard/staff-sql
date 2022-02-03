const {
  //   askUserFor,XXXXXXXXXXXXXXXXXXXXXXX
  askUserToSelect,
  askUserToDecide,
} = require("./lib/obtain-user-input");
const {
  connectDB,
  disconnectDB,
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require("./lib/db-utils");

const openingOptions = [
  "view all departments",
  "view all roles",
  "view all employees",
  "add a department",
  "add a role",
  "add an employee",
  "update an employee role",
  "quit",
];

const introMessage = () => {
  const intro = `
Welcome to the Employee Tracker!
----Use ^C at any time to quit.
`;
  console.log(intro);
};

const runEmployeeTracker = async function () {
  // Connect to database
  await connectDB();
  // Greet user
  introMessage();
  // Begin actions loop
  let quit = false;
  while (!quit) {
    let choice1 = await askUserToSelect("one of the following", openingOptions);
    switch (choice1) {
      case "view all departments":
        await viewDepartments();
        break;
      case "view all roles":
        await viewRoles();
        break;
      case "view all employees":
        await viewEmployees();
        break;
      case "add a department":
        await addDepartment();
        break;
      case "add a role":
        await addRole();
        break;
      case "add an employee":
        await addEmployee();
        break;
      case "update an employee role":
        await updateEmployeeRole();
        break;
      case "quit":
        quit = true;
        break;
      default:
        throw err;
    }
    // Quit option is provided here to make the rendering of reports cleaner and so that user doesn't have to go through the whole list to quit
    let choice2 = await askUserToDecide(
      "Do you have more Employee Tracker actions?"
    );
    if (!choice2) {
      quit = true;
    }
  }
  // Disconnect on quit
  disconnectDB();
};

runEmployeeTracker();
