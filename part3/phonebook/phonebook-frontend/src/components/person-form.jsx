const PersonForm = ({
  handleSubmit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name:{" "}
        <input
          placeholder="e.g. John"
          value={newName}
          onChange={handleNameChange}
        />
        <br />
        Number:{" "}
        <input
          placeholder="e.g. 040-1234567"
          value={newNumber}
          onChange={handleNumberChange}
          type="tel"
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};
export default PersonForm;
