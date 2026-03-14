import CountryDisplay from "./components/country-display";
import SearchBar from "./components/search-bar";
import Suggestions from "./components/suggestions";
import countryService from "./services/countries";
import { useState, useEffect } from "react";
import ErrorMessage from "./components/error-message";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    countryService
      .getAllCountries()
      .then((countryObj) => {
        setCountries(countryObj);
      })
      .catch((error) => {
        errorTimer("countries");
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    if (filteredCountries.length != 1) return;
    countryService
      .getWeather(filteredCountries[0].capital[0])
      .then((weatherData) => {
        setWeather(weatherData);
      })
      .catch((error) => {
        errorTimer("weather");
        console.error("Error fetching weather data:", error);
      });
  }, [searchTerm]);

  const errorTimer = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const showCountry = (countryName) => {
    setSearchTerm(countryName);
  };

  return (
    <div>
      <h1>Countries</h1>
      {error && <ErrorMessage message={error} />}
      <SearchBar handleSearch={handleSearch} value={searchTerm} />
      {searchTerm === "" ? (
        <p>Type to search for a country</p>
      ) : (
        <Suggestions
          filteredCountries={filteredCountries}
          showCountry={showCountry}
        />
      )}
      {filteredCountries.length === 1 && (
        <CountryDisplay country={filteredCountries[0]} weather={weather} />
      )}
    </div>
  );
};

export default App;
