import axios from "axios";
const baseUrl = "/api/persons";

const getAllPersons = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createPerson = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.error(error.response.data.error, error);
      throw error;
    });
};

const updatePerson = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.error(error.response.data.error, error);
      throw error;
    });
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.error(error.response.data.error, error);
      throw error;
    });
};

export default {
  getAllPersons,
  createPerson,
  updatePerson,
  deletePerson,
};
