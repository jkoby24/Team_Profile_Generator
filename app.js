const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

// Renders HTML
const render = require('./lib/htmlRenderer');

let employees = [];

managerInfo();

function managerInfo() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Enter managers name',
        name: 'name',
      },
      {
        type: 'input',
        message: 'Enter managers ID',
        name: 'id',
      },
      {
        type: 'input',
        message: 'Enter managers email',
        name: 'email',
      },
      {
        type: 'input',
        message: 'Enter managers office number',
        name: 'officeNumber',
      },
    ])
    .then(function (response) {
      const manager = new Manager(
        response.name,
        response.id,
        response.email,
        response.officeNumber
      );
      employees.push(manager);
      addToTeam();
    });
}

function addToTeam() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'Select additional members to add',
        choices: ['Engineer', 'Intern', 'Complete'],
        name: 'addToTeam',
      },
    ])
    .then(function (response) {
      if (response.addToTeam === 'Engineer') {
        addEngineer();
      }
      if (response.addToTeam === 'Intern') {
        addIntern();
      } else {
        team();
      }
    });
}

function addEngineer() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Enter engineers name',
        name: 'name',
      },
      {
        type: 'input',
        message: 'Enter engineers ID',
        name: 'id',
      },
      {
        type: 'input',
        message: 'Enter engineers email address',
        name: 'email',
      },
      {
        type: 'input',
        message: 'Enter engineers github',
        name: 'github',
      },
    ])
    .then(function (response) {
      const engineer = new Engineer(
        response.name,
        response.id,
        response.email,
        response.github
      );
      employees.push(engineer);
      addToTeam();
    });
}

function addIntern() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Enter interns name',
        name: 'name',
      },
      {
        type: 'input',
        message: 'Enter interns ID',
        name: 'id',
      },
      {
        type: 'input',
        message: 'Enter interns email address',
        name: 'email',
      },
      {
        type: 'input',
        message: 'Enter interns school',
        name: 'github',
      },
    ])
    .then(function (response) {
      const intern = new Intern(
        response.name,
        response.id,
        response.email,
        response.github
      );
      employees.push(intern);
      addToTeam();
    });
}

function team() {
  const teamHtml = render(employees);
  fs.writeFileSync(outputPath, teamHtml);
}
