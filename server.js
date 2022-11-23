//Ben Akram 
// SN: 158523217
// cyclic link : 
const express = require("express");
const app = express();
const path = require("path");
const HTTP_PORT = process.env.PORT || 8080;
const data = require("./test3_data.js");

// add handlebars
const exphbs = require("express-handlebars");
app.engine('.hbs', exphbs.engine({extname: '.hbs'}));
app.set('view engine', '.hbs');

//css
app.use(express.static('public'));

function onHTTPStart() {
  console.log("Express http server listening on port: " + HTTP_PORT);
}

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/bsd", (req, res) => {
  console.log("in bsd");
      data.getBSD()
      .then((data) => res.render("students", {data: data}))
      .catch((err) => res.json({message: err}));
});

app.get("/allStudents", (req, res) => {
  console.log("All: " + req.url);
  data.getAllStudents()
      .then((data) => res.render("students", {data: data}))
      .catch((err) => res.json({message: err}));
});

app.get("/highestGPA", (req, res) => {
  data.getHighestGPA()
    .then((data) => { res.render("student", { data: data })})
    .catch((err) => { res.jason({ message: err }) });
});

//old code
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

