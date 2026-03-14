import CountryData from "./country-data";
import WeatherData from "./weather-data";

const CountryDisplay = ({ country, weather }) => {
  return (
    <div
      style={{
        border: "4px solid #EBDAB7",
        backgroundColor: "#E0E0FF",
        padding: "0px 0px 30px 10px",
        marginTop: "10px",
        maxWidth: "500px",
      }}
    >
      <CountryData country={country} />
      <WeatherData weather={weather} capitalName={country.capital[0]} />
    </div>
  );
};

export default CountryDisplay;
