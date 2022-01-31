# Employee Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is a challenge project for the UC Berkeley Extension Full-Stack Developer Bootcamp Course. The challenge requires a command line application that accepts user input in order to track and update a `SQL` database.

There are three tables in the database: Departments, Roles, and Employees.  These tables reference each other through `FOREIGN KEY` commands in the database schema.  In addition, there is a `FOREIGN KEY` that is used within the Employees table to reference from one employee to their manager.  

For the command line interface, `inquirer` from `npm` is used, but the top-level `app.js` file does not call `inquirer` directly; rather, those calls are CLI-agnostic and `inquirer` is sequestered in the module `obtain-user-input.js`, which was written for a previous project and updated in this one.  `Async`, `await`, and `.then` coding is used with Promise objects to address the asynchronous nature of entry of inputs by the user.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Tests](#tests)
- [Questions](#questions)

## Installation

The first step is to copy this repo onto your computer using `git clone`.

The second step is to install a database on your computer; this project was built using MySQL, which can be downloaded [here](https://dev.mysql.com/downloads/installer/). In order to hide the database password, it is stored in `git_ignored.js` in the root directory, and that file has a function `mysqlPW()` that returns the password as a string to the `db/connection.js` file.

Lastly, this project uses the `inquirer`, `express`, `mysql2`, and `console.table` packages from `npm`. Ensure you have both `node.js` and `npm` initialized in your directory, then use `npm install` to ensure the correct package is installed (a `package.json` file is included in this repo).

## Usage

A video demonstrating use of the app can be found [here](https://drive.google.com/file/d/1mnOHn1nez2rT1dv2EAr-cvxWpB77mIWi/view?usp=sharing).

In order to get up and running:
1. Create a database (named `staff_12` in this code) using the MySQL command line.
2. You may wish to populate the database using the `db.sql`, `schema.sql`, and `seeds.sql` files in the `/db` directory.
3. Start the app using `node app.js`.  Then follow the CLI instuctions as demonstrated in the video.
    
## License
  
This project is licensed using MIT License

See the [LICENSE](./LICENSE) file for license rights and limitations.

## Tests

No testing files are included in this repo.
    
## Questions
        
My GitHub username is stuart-rickard; please feel free to contact me through my profile [here](https://github.com/stuart-rickard).