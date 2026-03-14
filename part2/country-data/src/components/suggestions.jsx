import CountryItem from "./country-item";

const Suggestions = ({ filteredCountries, showCountry }) => {
  let content;

  if (filteredCountries.length > 10) {
    content = <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length === 0) {
    content = <p>No matches</p>;
  } else if (filteredCountries.length === 1) {
    content = " ";
  } else {
    content = filteredCountries.map((c) => (
      <span key={c.name.common}>
        <CountryItem countryName={c.name.common} showCountry={showCountry} />
      </span>
    ));
  }

  return <div>{content}</div>;
};

export default Suggestions;
