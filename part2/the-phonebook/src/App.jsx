import { useState, useEffect } from "react";
import Filter from "./components/filter";
import PersonForm from "./components/person-form";
import Persons from "./components/persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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
    const inputName = newName.trim().toLowerCase();
    persons.some((person) => person.name === inputName)
      ? alert(`${inputName} is already added to phonebook`)
      : setPersons(
          persons.concat({
            name: inputName,
            number: newNumber,
            id: persons.length + 1,
          }),
        );
    setNewName("");
    setNewNumber("");
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
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
