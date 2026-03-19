import { useState, useEffect } from "react";
import Filter from "./components/filter";
import PersonForm from "./components/person-form";
import Persons from "./components/persons";
import Notification from "./components/notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);
  const [notifType, setNotifType] = useState(true);

  useEffect(() => {
    personService.getAllPersons().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const notifRunner = (message, type) => {
    setNotification(message);
    setNotifType(type);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const normalizeString = (str) => str.trim().toLowerCase();

  const filteredPersons = persons.filter((p) =>
    normalizeString(p.name).includes(searchTerm.toLowerCase()),
  );

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputName = normalizeString(newName);
    persons.some((p) => normalizeString(p.name) === inputName)
      ? handleUpdate(
          persons.find((p) => normalizeString(p.name) === inputName).id,
          newNumber,
        )
      : handleCreate();
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then((reply) => {
          setPersons(persons.filter((p) => p.id !== id));
          notifRunner(`Deleted ${person.name}`, true);
        })
        .catch((error) => {
          setPersons(persons.filter((p) => p.id !== id));
          notifRunner(error.response.data.error, false);
        });
    }
  };

  const handleUpdate = (id, newNumber) => {
    const person = persons.find((p) => p.id === id);
    const updatedPerson = { ...person, number: newNumber };
    if (window.confirm(`${person.name} already exists, update their number?`)) {
      personService
        .updatePerson(id, updatedPerson)
        .then((reply) => {
          setPersons(persons.map((p) => (p.id === id ? reply : p)));
          notifRunner(`Updated ${person.name}`, true);
        })
        .catch((error) => {
          notifRunner(error.response.data.error, false);
        });
    }
  };

  const handleCreate = () => {
    personService
      .createPerson({ name: newName, number: newNumber })
      .then((reply) => {
        setPersons(persons.concat(reply));
        notifRunner(`Added ${reply.name}`, true);
      })
      .catch((error) => {
        notifRunner(error.response.data.error, false);
      });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} type={notifType} />
      <Filter value={searchTerm} onChange={handleSearch} />

      <h2>Add a new user</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
