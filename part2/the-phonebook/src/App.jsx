import { useState, useEffect } from "react";
import Filter from "./components/filter";
import PersonForm from "./components/person-form";
import Persons from "./components/persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    personService.getAllPersons().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

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
      : personService
          .createPerson({ name: newName, number: newNumber })
          .then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson));
          });
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  const handleUpdate = (id, newNumber) => {
    const person = persons.find((p) => p.id === id);
    const updatedPerson = { ...person, number: newNumber };
    if (window.confirm(`${person.name} already exists, update their number?`)) {
      personService.updatePerson(id, updatedPerson).then((returnedPerson) => {
        setPersons(persons.map((p) => (p.id === id ? returnedPerson : p)));
      });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
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
