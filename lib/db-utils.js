const {
  askUserFor,
  askUserForNumber,
  askUserToSelectAndGetIndex,
} = require("./obtain-user-input");
const db = require("../db/connection");
const cTable = require("console.table");

const connectDB = async function () {
  await db.connect((err) => {
    if (err) throw err;
  });
  console.log("Employee database connected.");
};

const disconnectDB = async function () {
  await db.end((err) => {
    if (err) throw err;
  });
  console.log("Employee database disconnected.");
};

const getManagers = async function () {
  // Get employee_id's, first names, and last names of all managers
  const sql = `SELECT T1.employee_id, T1.first_name, T1.last_name FROM employees T1 JOIN (SELECT DISTINCT T2.manager_id FROM employees T2) T3 ON T1.employee_id = T3.manager_id`;
  const managers = await db.promise().query(sql);
  return managers[0];
};

const getDepartments = async function () {
  const sql = `SELECT * FROM departments`;
  const departments = await db.promise().query(sql);
  return departments[0];
};

const viewDepartments = async function () {
  const sql = `SELECT department_name, department_id FROM departments`;
  const rows = await db.promise().query(sql);
  console.log("\n");
  console.table(rows[0]);
  console.log("\n");
  return;
};

const getRoles = async function () {
  const sql = `SELECT * FROM roles`;
  const roles = await db.promise().query(sql);
  return roles[0];
};

const viewRoles = async function () {
  const sql = `SELECT roles.title, roles.role_id, departments.department_name, roles.salary FROM roles LEFT JOIN departments ON roles.department_id = departments.department_id`;
  const rows = await db.promise().query(sql);
  console.log("\n");
  console.table(rows[0]);
  console.log("\n");
};

const getEmployees = async function () {
  const sql = `SELECT employee_id, first_name, last_name FROM employees`;
  const employees = await db.promise().query(sql);
  return employees[0];
};

const viewEmployees = async function () {
  const sql = `SELECT T1.employee_id, T1.first_name, T1.last_name,
    roles.title, departments.department_name, roles.salary, T2.first_name AS 'manager-first', T2.last_name AS 'manager_last'
    FROM (((employees T1 LEFT JOIN roles ON T1.role_id = roles.role_id)
    LEFT JOIN departments on roles.department_id = departments.department_id)
    LEFT JOIN employees T2 ON T1.manager_id = T2.employee_id);`;
  const rows = await db.promise().query(sql);
  console.log("\n");
  console.table(rows[0]);
  console.log("\n");
};

const addDepartment = async function () {
  let departmentName = await askUserFor("name of department to be added");
  const sql = `INSERT INTO departments (department_name) VALUES ('${departmentName}')`;
  const rows = await db.promise().query(sql);
  console.log("\n" + departmentName + " was added to the departments table.\n");
};

const addRole = async function () {
  let departmentsResults = await getDepartments();
  let departmentsArray = departmentsResults.map((o) => o.department_name);

  let title = await askUserFor("title of role to be added");
  let salary = await askUserForNumber("salary of role to be added");
  let indexInArray = await askUserToSelectAndGetIndex(
    "department of role to be added",
    departmentsArray
  );
  let departmentID = departmentsResults[indexInArray].department_id;
  const sql = ` INSERT INTO roles ( title, salary, department_id ) VALUES ('${title}', ${Number(
    salary
  )}, ${departmentID})`;
  await db.promise().query(sql);
  console.log("\n" + title + " was added to the departments table.\n");
};

const addEmployee = async function () {
  // SQL queries to get lists of roles and managers
  let rolesResults = await getRoles();
  let rolesArray = rolesResults.map((o) => o.title);

  let managersResults = await getManagers();
  let managersArray = managersResults.map((o) => {
    let fullName = o.first_name + " " + o.last_name;
    return fullName;
  });

  // Questions for user
  // - first name
  let firstName = await askUserFor("first name of employee to be added");
  // - last name
  let lastName = await askUserFor("last name of employee to be added");
  // - role
  let indexInRolesArray = await askUserToSelectAndGetIndex(
    "role of employee to be added",
    rolesArray
  );
  let roleID = rolesResults[indexInRolesArray].role_id;

  // - manager
  let managerID = "";
  // - - provide an "Other" option to the list of managers in case the manager is not currently a manager
  managersArray.push("Other");
  let indexInManagersArray = await askUserToSelectAndGetIndex(
    "manager of employee to be added",
    managersArray
  );
  console.log(indexInManagersArray);
  // - - if user chooses "Other", provide list of all employees
  if (indexInManagersArray == managersArray.length - 1) {
    let allEmployeesResults = await getEmployees();
    let allEmployeesArray = allEmployeesResults.map((o) => {
      let fullName = o.first_name + " " + o.last_name;
      return fullName;
    });
    console.log("\nPlease choose a manager from the full list of employees\n");
    let indexInAllEmployeesArray = await askUserToSelectAndGetIndex(
      "manager of employee to be added",
      allEmployeesArray
    );
    managerID = allEmployeesResults[indexInAllEmployeesArray].employee_id;
    // - - if user does not choose "Other", use the chosen manager
  } else {
    managerID = managersResults[indexInManagersArray].employee_id;
  }
  // Update database
  const sql = `INSERT INTO employees ( first_name, last_name, role_id, manager_id ) VALUES ('${firstName}', '${lastName}', ${roleID}, ${managerID} )`;
  await db.promise().query(sql);
  console.log(
    "\n" + firstName + " " + lastName + " was added to the employees table.\n"
  );
};

const updateEmployeeRole = async () => {
  // User selects the employee
  let allEmployeesResults = await getEmployees();
  let allEmployeesArray = allEmployeesResults.map((o) => {
    let fullName = o.first_name + " " + o.last_name;
    return fullName;
  });
  let indexInAllEmployeesArray = await askUserToSelectAndGetIndex(
    "employee needing updated role",
    allEmployeesArray
  );
  let employee = allEmployeesResults[indexInAllEmployeesArray].employee_id;
  let employeeName =
    allEmployeesResults[indexInAllEmployeesArray].first_name +
    " " +
    allEmployeesResults[indexInAllEmployeesArray].last_name;
  // User selects the role
  let rolesResults = await getRoles();
  let rolesArray = rolesResults.map((o) => o.title);
  let indexInRolesArray = await askUserToSelectAndGetIndex(
    "role of employee to be added",
    rolesArray
  );
  let newRole = rolesResults[indexInRolesArray].role_id;
  let newRoleTitle = rolesResults[indexInRolesArray].title;
  // Update the database
  const sql = `UPDATE employees SET role_id = ${newRole} WHERE employee_id = ${employee}`;
  await db.promise().query(sql);
  console.log(
    "\n" +
      employeeName +
      "'s role is now updated to " +
      newRoleTitle +
      " in the employees table.\n"
  );
};

module.exports = {
  connectDB,
  disconnectDB,
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
