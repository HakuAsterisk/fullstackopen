const WeatherData = ({ weather, capitalName }) => {
  const iconBaseUrl = "https://openweathermap.org/payload/api/media/file/";

  return (
    <>
      <h2>Weather in {capitalName}</h2>
      {weather ? (
        <div>
          <span>Temp: {(weather.main.temp - 273.15).toFixed(2)} C°</span>
          <br />
          <span>
            Feels like: {(weather.main.feels_like - 273.15).toFixed(2)} C°
          </span>
          <br />
          <p>Wind: {weather.wind.speed} M/s</p>
          <span>Looks like it's (a) {weather.weather[0].description}</span>
          <br />
          <img
            style={{ border: "1px solid black" }}
            src={`${iconBaseUrl}${weather.weather[0].icon}.png`}
            alt={""}
          />
        </div>
      ) : (
        <span>Loading weather data...</span>
      )}
    </>
  );
};

export default WeatherData;
