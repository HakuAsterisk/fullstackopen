import { useState } from "react";

const Button = ({ onClick, text }) => (
  <>
    <button onClick={onClick}>{text}</button>{" "}
  </>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = all === 0 ? 0 : (good - bad) / all;
  const positive = all === 0 ? 0 : (good / all) * 100;

  if (all === 0) {
    return <p>There is no feedback yet.</p>;
  }
  return (
    <>
      <table>
        <tbody>
          <StatisticsLine text="Good: " value={good} />
          <StatisticsLine text="Neutral: " value={neutral} />
          <StatisticsLine text="Bad: " value={bad} />
          <StatisticsLine text="All: " value={all} />
          <StatisticsLine text="Average: " value={average.toFixed(2)} />
          <StatisticsLine
            text="Positive: "
            value={`${positive.toFixed(2)} %`}
          />
        </tbody>
      </table>
    </>
  );
};

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (value) => {
    value === "good" && setGood(good + 1);
    value === "neutral" && setNeutral(neutral + 1);
    value === "bad" && setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give feedback!</h1>
      <Button onClick={() => handleClick("good")} text="good" />
      <Button onClick={() => handleClick("neutral")} text="neutral" />
      <Button onClick={() => handleClick("bad")} text="bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
