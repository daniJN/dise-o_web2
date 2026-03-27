import axios from "axios";

const URL = `${process.env.REACT_APP_API_URL}/directores`;

export const getDirectores = () => axios.get(URL);

export const crearDirector = (data) => axios.post(URL, data);

export const actualizarDirector = (id, data) => 
  axios.put(`${URL}/${id}`, data);

export const eliminarDirector = (id) => 
  axios.delete(`${URL}/${id}`);