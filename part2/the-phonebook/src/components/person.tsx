const Person = ({ name, number }: { name: string; number: string }) => {
  return (
    <p>
      {name} {number}
    </p>
  );
};
export default Person;
