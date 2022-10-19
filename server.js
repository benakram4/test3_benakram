//https://kind-tights-bull.cyclic.app


const express = require("express");
const app = express();
const path = require("path");
const HTTP_PORT = process.env.PORT || 8080;
const data = require("./test2_data.js");


app.use(express.static('public'));

function onHTTPStart() {
  console.log("Express http server listening on port: " + HTTP_PORT);
}

app.get("/", (req, res) => {
  var resText = "<h2>Declaration</h2><br>";
  resText += '<p>I acknowledge the College\'s integrity policy - and my own integrity - remain in effect whether '
    + 'my work is done remotely or onsite. <br>Any test or assignment is an act of trust between me and my instructor, ' 
    + 'and especially with my classmates... even when no one is watching. I declare I will not break that trust.</p>'
  resText += "Name: " + "<mark>Ben Akram</mark><br><br>";
  resText += "Student Number: " + "<mark>158523217</mark><br><br>";
  resText += "<a href = '/CPA'>Click to visit CPA Students</a> <br><br>";
  resText += "<a href = '/highGPA'>Click to see who has the highest GPA</a>";
  res.send(resText);
});

app.get("/CPA", (req, res) => {
    data.getCPA()
        .then((data) => {res.json(data);})
        .catch((err) => {res.json({ message: err });});

});

app.get("/highGPA", (req, res) => {
    data.getHighestGPA()
        .then((data) => {res.send('<h2>Highest GPA:</h2>'
        + 'Student ID: ' + data.studId 
        + '<br><br>Name: ' + data.name
        + '<br><br>Program: ' + data.program
        + '<br><br>GPA: ' + data.gpa
        )})
        .catch((err) => {res.json({ message: err });});
});




 app.use((req, res) => {
   res.status(404).send("Error 404: Page Not Found");
});

data.prepare().then(app.listen(HTTP_PORT, onHTTPStart())).catch((err) => {console.log(err);});

