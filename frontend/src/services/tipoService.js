import axios from "axios";

const URL = `${process.env.REACT_APP_API_URL}/tipos`;

export const getTipos = () => {
  return axios.get(URL);
};

export const crearTipo = (data) => {
  return axios.post(URL, data);
};

export const actualizarTipo = (id, data) => {
  return axios.put(`${URL}/${id}`, data);
};

export const eliminarTipo = (id) => {
  return axios.delete(`${URL}/${id}`);
};