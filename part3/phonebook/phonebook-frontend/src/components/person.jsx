const Person = ({ person: { name, number, id }, handleDelete }) => {
  return (
    <p>
      {name} {number} <button onClick={() => handleDelete(id)}>Delete</button>
    </p>
  );
};
export default Person;
