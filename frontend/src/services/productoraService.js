import axios from "axios";

const URL = `${process.env.REACT_APP_API_URL}/productoras`;

export const getProductoras = () => {
  return axios.get(URL);
};

export const crearProductora = (data) => {
  return axios.post(URL, data);
};

export const actualizarProductora = (id, data) => {
  return axios.put(`${URL}/${id}`, data);
};

export const eliminarProductora = (id) => {
  return axios.delete(`${URL}/${id}`);
};