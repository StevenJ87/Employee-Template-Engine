const Manager = require("./lib/Manager");
const managerMarkdown = require("./templates/manager");
const internMarkdown = require("./templates/intern");
const engineerMarkdown = require("./templates/engineer");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
    {
        type: "list",
        message:"What is yourt role",
        name: "role",
        choices:[
            'Manager',
            'Engineer',
            'Intern'
        ]
    },
];

const manager = [
    {
        type: "input",
        message: "What is your name",
        name: "name",
    },
    {
        type: "input",
        message:"What is your ID number",
        name: "id"
    },
    {
        type: "input",
        message:"What is your email address",
        name: "email"
    },
    {
        type: "input",
        message: "What is your office number",
        name: "officeNumber",
    },
];

const engineer = [
    {
        type: "input",
        message: "What is your name",
        name: "name",
    },
    {
        type: "input",
        message:"What is your ID number",
        name: "id"
    },
    {
        type: "input",
        message:"What is your email address",
        name: "email"
    },
    {
        type: "input",
        message: "What is your GitHub username",
        name: "github",
    },
];

const intern = [
    {
        type: "input",
        message: "What is your name",
        name: "name",
    },
    {
        type: "input",
        message:"What is your ID number",
        name: "id"
    },
    {
        type: "input",
        message:"What is your email address",
        name: "email"
    },
    {
        type: "input",
        message: "What school do you attend",
        name: "school",
    },
];

function init(){
    return inquirer.prompt(questions);
};

function manage(){
    return inquirer.prompt(manager)
};

function engine(){
    return inquirer.prompt(engineer)
};

function inter(){
    return inquirer.prompt(intern)
};

init()
.then((questions)=>{
    if (questions.role === "Manager"){
        manage()
        .then((manager)=>{
            return newEmploy = new Manager(manager.name,manager.id,manager.email,manager.officeNumber);
        })
        .then(create=>{
            const newCard = managerMarkdown(newEmploy);
            return writeFileAsync(`${newEmploy.name}_README.md`, newCard);
        })
    } else if(questions.role === "Engineer"){
        engine()
        .then((engineer)=>{
            return newEmploy = new Engineer(engineer.name,engineer.id,engineer.email,engineer.github);
        })
        .then(create=>{
            const newCard = engineerMarkdown(newEmploy);
            return writeFileAsync(`${newEmploy.name}_README.md`, newCard);
        })

    } else if (questions.role === "Intern"){
        inter()
        .then((intern)=>{
            return newEmploy = new Intern(intern.name,intern.id,intern.email,intern.school);
        })
        .then(create=>{
            const newCard = internMarkdown(newEmploy);
            return writeFileAsync(`${newEmploy.name}_README.md`, newCard);
        })

    }
});

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
