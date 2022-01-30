const {
  askUserFor,
  askUserToSelect,
  askUserToSelectAndGetIndex,
  askUserToDecide,
} = require("./obtain-user-input");
const db = require("../db/connection");
const cTable = require("console.table");

const getDepartments = async function () {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(rows);
  });
};

const connectDB = async function () {
  await db.connect((err) => {
    if (err) throw err;
  });
  console.log("Employee database connected.");
};

const viewDepartments = () => {
  const sql = `SELECT department_name, department_id FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
  });
};

const viewRoles = () => {
  const sql = `SELECT roles.title, roles.role_id, departments.department_name, roles.salary FROM roles LEFT JOIN departments ON roles.department_id = departments.department_id`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
  });
};

const viewEmployees = () => {
  const sql = `SELECT T1.employee_id, T1.first_name, T1.last_name, 
    roles.title, departments.department_name, roles.salary, T2.last_name AS 'manager' 
    FROM (((employees T1 LEFT JOIN roles ON T1.role_id = roles.role_id) 
    LEFT JOIN departments on roles.department_id = departments.department_id)
    LEFT JOIN employees T2 ON T1.manager_id = T2.employee_id);`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
  });
};

const addDepartment = async () => {
  let departmentName = await askUserFor("name of department to be added");
  //   console.log( departmentName);
  const sql = `INSERT INTO departments (department_name) VALUES ('${departmentName}')`;
  //   console.log( sql);
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("\n" + departmentName + " was added to the departments table.\n");
  });
};

const addRole = async () => {
  //   let departmentsResults = await getDepartments();
  //   console.log("inside addrole near top");
  //   console.log(departmentsResults);
  //   let departmentsArray = departmentsResults.map((o) => o.department_name);

  let title = await askUserFor("title of role to be added");
  let salary = await askUserFor("salary of role to be added");
  //   let indexInArray = await askUserToSelectAndGetIndex(
  //     "department of role to be added",
  //     departmentsArray
  //   );
  //   let departmentID = departmentsResults[indexInArray].department_id;
  let departmentID = await askUserFor("ID of department of role to be added");
  const sql = ` INSERT INTO roles ( title, salary, department_id ) VALUES ('${title}', ${Number(salary)}, ${departmentID})`;
            // delete Number function for salary?


  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
  });
};

const addEmployee = async () => {
    let firstName = await askUserFor("first name of employee to be added");
    let lastName = await askUserFor("last name of employee to be added");
    let role = await askUserFor("role of employee to be added");
    let manager = await askUserFor("manager of employee to be added");
    const sql = `INSERT INTO employees ( first_name, last_name, role_id, manager_id ) VALUES ('${firstName}', '${lastName}', ${role}, ${manager} )`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("\n" + firstName + " " + lastName + " was added to the employees table.\n");
    });
  };

const updateEmployeeRole = async () => {
    let employee = await askUserFor("employee needing updated role");
    let newRole = await askUserFor("updated role of employee");
    const sql = `UPDATE employees SET role_id = ${newRole} WHERE employee_id = ${employee}`;
    //   console.log( sql);
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("\n" + employee + "\'s role is now updated to " + newRole + " in the employees table.\n");
    });
  };

module.exports = {
  connectDB,
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
};
