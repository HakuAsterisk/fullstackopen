const Header = (props) => (
  <div>
    <h1>{props.course.name}</h1>
  </div>
);

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.exercises.courseParts.reduce(
          (sum, part) => sum + part.exercises,
          0,
        )}
      </p>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.courseParts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    courseParts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total exercises={course} />
    </div>
  );
};

export default App;
