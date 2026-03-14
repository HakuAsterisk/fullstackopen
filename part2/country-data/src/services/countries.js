import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/";
const geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?";

const getAllCountries = () => {
  const request = axios.get(`${baseUrl}/api/all`);
  return request.then((response) => response.data);
};

const getWeather = (capital) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const geoCodeRequest = axios.get(
    `${geoUrl}${capital}&limit=1&appid=${apiKey}`,
  );
  const weatherRequest = geoCodeRequest.then((response) => {
    const { lat, lon } = response.data[0];
    return axios.get(`${weatherUrl}lat=${lat}&lon=${lon}&appid=${apiKey}`);
  });
  return weatherRequest.then((response) => response.data);
};

export default {
  getAllCountries,
  getWeather,
};
