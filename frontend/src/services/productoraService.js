import axios from "axios";

const API = "http://localhost:4000/api/productoras";

export const getProductoras = () => {
  return axios.get(API);
};

export const crearProductora = (data) => {
  return axios.post(API, data);
};

export const actualizarProductora = (id, data) => {
  return axios.put(`${API}/${id}`, data);
};

export const eliminarProductora = (id) => {
  return axios.delete(`${API}/${id}`);
};