const CountryData = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <span>
        Capital: {country.capital[0]}
        <br />
      </span>
      <span>
        Population: {country.population.toLocaleString("fi-FI")}
        <br />
      </span>
      <span>
        Area: {country.area.toLocaleString("fi-FI")} km²
        <br />
      </span>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <h2>Currencies</h2>
      <ul>
        {Object.values(country.currencies).map((c) => (
          <li key={c.name}>
            {c.name} ({c.symbol})
          </li>
        ))}
      </ul>
      <h2>Flag</h2>
      <img
        style={{ border: "1px solid black" }}
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
      />
    </>
  );
};

export default CountryData;
