const {
  askUserFor,
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
  await connectDB();
  introMessage();
  let quit = false;
  while (!quit) {
    console.log("top of while loop");

    let choice = await askUserToSelect("one of the following", openingOptions);
    switch (choice) {
      case "view all departments":
        await viewDepartments();
        console.log("after view depts call");
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
        console.log(quit);
        break;
      default:
        throw err;
        console.log("not supposed to end up here");
    }
    let choice2 = await askUserToDecide(
      "Do you have more Employee Tracker actions?"
    );
    if (!choice2) {
      quit = true;
    }
  }
  console.log("outside while loop");
  disconnectDB();
  console.log("all done");
};

runEmployeeTracker();
