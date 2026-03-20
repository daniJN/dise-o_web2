import { useEffect, useState } from "react";
import axios from "axios";

function Tipo(){

  const API = "http://localhost:4000/api/tipos";

  const [tipos, setTipos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editando, setEditando] = useState(false);
  const [idTipo, setIdTipo] = useState(null);

  useEffect(()=>{ cargarTipos(); },[]);

  const cargarTipos = async()=>{
    const res = await axios.get(API);
    setTipos(res.data.data || []);
  }

  const guardarTipo = async(e)=>{
    e.preventDefault();
    if(!nombre){ alert("El nombre es obligatorio"); return; }

    try {
      if(editando){
        await axios.put(`${API}/${idTipo}`, { nombre, descripcion });
      } else {
        await axios.post(API, { nombre, descripcion });
      }
      limpiar();
      cargarTipos();
    } catch(error){
      alert(error.response?.data?.mensaje || "Error al guardar");
    }
  }

  const editarTipo = (t)=>{
    setNombre(t.nombre);
    setDescripcion(t.descripcion || "");
    setIdTipo(t._id);
    setEditando(true);
  }

  const eliminarTipo = async(id)=>{
    if(!window.confirm("¿Eliminar tipo?")) return;
    await axios.delete(`${API}/${id}`);
    cargarTipos();
  }

  const limpiar = ()=>{
    setNombre(""); setDescripcion("");
    setEditando(false); setIdTipo(null);
  }

  return(
    <div className="container mt-4">
      <h2>Modulo Tipo</h2>

      <form onSubmit={guardarTipo} className="mb-4">
        <input className="form-control mb-2" placeholder="Nombre"
          value={nombre} onChange={(e)=>setNombre(e.target.value)} />
        <textarea className="form-control mb-2" placeholder="Descripción"
          value={descripcion} onChange={(e)=>setDescripcion(e.target.value)}></textarea>

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
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map((t)=>(
            <tr key={t._id}>
              <td>{t.nombre}</td>
              <td>{t.descripcion}</td>
              <td>
                <button className="btn btn-warning me-2"
                  onClick={()=>editarTipo(t)}>Editar</button>
                <button className="btn btn-danger"
                  onClick={()=>eliminarTipo(t._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Tipo;