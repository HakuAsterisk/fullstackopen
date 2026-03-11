//Time spent so far ~1h
//Defining each part of the component separately was frustrating so I added a slightly cleaner execution.
//I'll probably stick more sternly to the instructions in the future but this was a nice warmup for today.

const Header = (props) => (
  <div>
    <h1>{props.course}</h1>
  </div>
);

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.exercises.reduce((sum, part) => sum + part.exercises, 0)}
      </p>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.name} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const contentParts = [
    { name: "Fundamentals of React", exercises: 10 },
    { name: "Using props to pass data", exercises: 7 },
    { name: "State of a component", exercises: 14 },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={contentParts} />
      <Total exercises={contentParts} />
    </div>
  );
};

export default App;
