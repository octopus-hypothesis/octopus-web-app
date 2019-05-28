const express = require("express");
const bodyParser = require("body-parser");

const db = require("./postgresQueries").queries;
const rh = require("./dbRequests")(db);

const app = express();
const port = process.env.PORT || 3001;

// Can access anything in this folder
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/api", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/api/problems", rh.getProblems);
app.get("/api/problems/:id", rh.getProblemByID);
app.put("/api/problems/:id/publications", rh.getPublicationsByProblem);
app.get("/api/publications/:id", rh.getPublicationByID);

//app.post("/api/pdf2html", pdfToHtml);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
  // db.getProblems();
});

//const pino = require('express-pino-logger')();
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(pino);

//app.get('/api/greeting', (req, res) => {
//  const name = req.query.name || 'World';
//  res.setHeader('Content-Type', 'application/json');
//  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
//});

//app.listen(3001, () =>
//  console.log('Express server is running on localhost:3001')
//);
