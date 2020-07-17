const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const writeFileAsync = util.promisify(fs.writeFile);

const teamArray =[];

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
        .then((answers)=>{
            let newManager = new Manager(answers.name,answers.id,answers.email,answers.officeNumber)
            teamArray.push(newManager);
            addmore();
        })
    } else if(questions.role === "Engineer"){
        engine()
        .then((answers)=>{
            let newEngineer = new Engineer(answers.name,answers.id,answers.email,answers.github)
            teamArray.push(newEngineer);
            addmore();
        })
    } else if (questions.role === "Intern"){
        inter()
        .then((answers)=>{
            let newIntern = new Intern(answers.name,answers.id,answers.email,answers.school)
            teamArray.push(newIntern);
            addmore();
        })
    }
});

function addmore(){
    inquirer.prompt([
        {
        name:"addToTeam",
        type:"confirm",
        message:"Do you want to add more team members?"
        },
    ]).then(response=>{
        if(response.addToTeam){
            init();
        } else{
            const teamHTML = render(teamArray);
            console.log(teamArray)
            console.log(teamHTML);
            fs.writeFile(outputPath, teamHTML,function(err){
                if(err)throw err;
            })
        }
    })
}

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
