import Person from "./person";

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((p) => (
        <div key={p.id}>
          <Person person={p} handleDelete={handleDelete} />
        </div>
      ))}
    </div>
  );
};
export default Persons;
