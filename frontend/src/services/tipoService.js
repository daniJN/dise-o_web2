import axios from "axios";

const API = "http://localhost:4000/api/tipos";

export const getTipos = () => {
  return axios.get(API);
};

export const crearTipo = (data) => {
  return axios.post(API, data);
};

export const actualizarTipo = (id, data) => {
  return axios.put(`${API}/${id}`, data);
};

export const eliminarTipo = (id) => {
  return axios.delete(`${API}/${id}`);
};