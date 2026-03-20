import { useEffect, useState } from "react";
import axios from "axios";

function Productora(){

  const API = "http://localhost:4000/api/productoras";

  const [productoras, setProductoras] = useState([]);
  const [nombre, setNombre] = useState("");
  const [slogan, setSlogan] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("Activo");
  const [editando, setEditando] = useState(false);
  const [idProductora, setIdProductora] = useState(null);

  useEffect(()=>{ cargarProductoras(); },[]);

  const cargarProductoras = async()=>{
    const res = await axios.get(API);
    setProductoras(res.data.data || []);
  }

  const guardarProductora = async(e)=>{
    e.preventDefault();
    if(!nombre){ alert("El nombre es obligatorio"); return; }

    try {
      if(editando){
        await axios.put(`${API}/${idProductora}`, { nombre, slogan, descripcion, estado });
      } else {
        await axios.post(API, { nombre, slogan, descripcion, estado: 'Activo' });
      }
      limpiar();
      cargarProductoras();
    } catch(error){
      alert(error.response?.data?.mensaje || "Error al guardar");
    }
  }

  const editarProductora = (p)=>{
    setNombre(p.nombre);
    setSlogan(p.slogan || "");
    setDescripcion(p.descripcion || "");
    setEstado(p.estado);
    setIdProductora(p._id);
    setEditando(true);
  }

  const eliminarProductora = async(id)=>{
    if(!window.confirm("¿Eliminar productora?")) return;
    await axios.delete(`${API}/${id}`);
    cargarProductoras();
  }

  const limpiar = ()=>{
    setNombre(""); setSlogan(""); setDescripcion("");
    setEstado("Activo"); setEditando(false); setIdProductora(null);
  }

  return(
    <div className="container mt-4">
      <h2>Modulo Productora</h2>

      <form onSubmit={guardarProductora} className="mb-4">
        <input className="form-control mb-2" placeholder="Nombre de la productora"
          value={nombre} onChange={(e)=>setNombre(e.target.value)} />
        <input className="form-control mb-2" placeholder="Slogan"
          value={slogan} onChange={(e)=>setSlogan(e.target.value)} />
        <textarea className="form-control mb-2" placeholder="Descripción"
          value={descripcion} onChange={(e)=>setDescripcion(e.target.value)}></textarea>

        {editando && (
          <select className="form-control mb-2" value={estado}
            onChange={(e)=>setEstado(e.target.value)}>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        )}

        <button className="btn btn-primary me-2">
          {editando ? "Actualizar" : "Guardar"}
        </button>
        {editando && (
          <button type="button" className="btn btn-secondary" onClick={limpiar}>
            Cancelar
          </button>
        )}
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Slogan</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productoras.map((p)=>(
            <tr key={p._id}>
              <td>{p.nombre}</td>
              <td>{p.slogan}</td>
              <td>{p.descripcion}</td>
              <td>{p.estado}</td>
              <td>
                <button className="btn btn-warning me-2"
                  onClick={()=>editarProductora(p)}>Editar</button>
                <button className="btn btn-danger"
                  onClick={()=>eliminarProductora(p._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Productora;