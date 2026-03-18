const express = require("express");
const morgan = require("morgan");
const app = express();

require("dotenv").config();
const Person = require("./models/person");

app.use(express.static("dist"));
app.use(express.json());

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan("tiny", {
    skip: (req, res) =>
      req.url.startsWith("/.well-known/") || req.method == "POST",
  }),
);
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :body",
    {
      skip: (req, res) => req.method !== "POST",
    },
  ),
);

// info
app.get("/info", (req, res) => {
  const date = new Date();
  Person.find({}).then((data) => {
    res.send(`
    <p>Phonebook has info about ${data.length} people</p>
    <p>${date}</p>
    `);
  });
});

// get
app.get("/api/persons", (req, res) => {
  Person.find({}).then((people) => {
    res.json(people);
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findById(id).then((person) => res.json(person));
});

// post
app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Required information missing.",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((person) => {
    res.json(person);
  });
});

// delete
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  data = data.filter((person) => person.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
