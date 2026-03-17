const express = require("express");
const morgan = require("morgan");
const app = express();
let data = require("./data.json");

app.use(express.json());
app.use(express.static("dist"));

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

app.get("/", (req, res) => {
  res.send("<h1>Phonebook!</h1>");
});

// info

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`
    <p>Phonebook has info for ${data.length} people</p>
    <p>${date}</p>
    `);
});

// get

app.get("/api/persons", (req, res) => {
  res.json(data);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = data.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.statusMessage = "Person not found";
    res.status(404).end();
  }
});

// post

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const max = 1000000;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Required information missing.",
    });
  }

  if (data.find((person) => person.name === body.name)) {
    return res.status(400).json({
      error: "Name must be unique.",
    });
  }

  const person = {
    id: Math.floor(Math.random() * max).toString(),
    name: body.name,
    number: body.number,
  };

  data = data.concat(person);
  res.json(person);
});

// delete

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  data = data.filter((person) => person.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
