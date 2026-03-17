const Filter = ({ onChange, value }) => (
  <div>
    <input placeholder="search..." value={value} onChange={onChange} />
  </div>
);

export default Filter;
