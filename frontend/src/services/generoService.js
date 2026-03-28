import axios from "axios";

const URL = `${process.env.REACT_APP_API_URL}/generos`;

export const getGeneros = () => axios.get(URL);

export const crearGenero = (data) => axios.post(URL, data);

export const actualizarGenero = (id,data) => 
  axios.put(`${URL}/${id}`, data);

export const eliminarGenero = (id) => 
  axios.delete(`${URL}/${id}`);