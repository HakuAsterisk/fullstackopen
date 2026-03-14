const CountryItem = ({ countryName, showCountry }) => {
  return (
    <div>
      <span>{countryName}</span>
      <button
        onClick={() => {
          showCountry(countryName);
        }}
      >
        show
      </button>
    </div>
  );
};

export default CountryItem;
