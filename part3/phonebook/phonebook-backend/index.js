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

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => res.json(person))
    .catch((error) => next(error));
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

// put
app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const { name, number } = req.body;
  Person.findById(id)
    .then((person) => {
      if (!person) {
        return res.status(404).json({ error: "Person not found" });
      }
      person.name = name;
      person.number = number;

      return person.save().then((updatedPerson) => {
        res.json(updatedPerson);
      });
    })
    .catch((error) => next(error));
});

// delete
app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

// unknown
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unknown endpoint" });
};
app.use(unknownEndpoint);

//error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "Incorrect id format" });
  }
  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
