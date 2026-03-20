import axios from "axios";

const API = "http://localhost:4000/api/medias";

export const getMedias = () => {
  return axios.get(API);
};

export const crearMedia = (data) => {
  return axios.post(API, data);
};

export const actualizarMedia = (id, data) => {
  return axios.put(`${API}/${id}`, data);
};

export const eliminarMedia = (id) => {
  return axios.delete(`${API}/${id}`);
};