const Filter = ({
  onChange,
  value,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
}) => (
  <div>
    <input placeholder="search..." value={value} onChange={onChange} />
  </div>
);

export default Filter;
