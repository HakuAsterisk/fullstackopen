import Person from "./person";

const Persons = ({
  persons,
}: {
  persons: [{ name: string; number: string; id: number }];
}) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <Person name={person.name} number={person.number} />
        </div>
      ))}
    </div>
  );
};
export default Persons;
