import { useEffect, useState } from "react";
import { getDirectores, crearDirector, eliminarDirector, actualizarDirector } from "../services/directorService";

function Director(){

  const [directores, setDirectores] = useState([]);

  const [nombre, setNombre] = useState("");        // ✅ inicializado con ""
  const [estado, setEstado] = useState("Activo");  // ✅ string, no booleano

  const [editando, setEditando] = useState(false);
  const [idDirector, setIdDirector] = useState(null);

  useEffect(()=>{
    cargarDirectores();
  },[]);

  const cargarDirectores = async ()=>{
    const res = await getDirectores();
    setDirectores(res.data.data || []);
  }

  const guardarDirector = async (e)=>{
    e.preventDefault();

    if(editando){
      await actualizarDirector(idDirector, {
        nombres: nombre,  // ✅ el backend espera "nombres"
        estado
      });
    } else {
      await crearDirector({
        nombres: nombre,  // ✅ el backend espera "nombres"
        estado
      });
    }

    setNombre("");
    setEstado("Activo");
    setEditando(false);
    setIdDirector(null);

    cargarDirectores();
  }

  const borrarDirector = async(id)=>{
    await eliminarDirector(id);
    cargarDirectores();
  }

  const editarDirector = (d)=>{
    setNombre(d.nombres);   // ✅ leer "nombres" del objeto
    setEstado(d.estado);
    setIdDirector(d._id);
    setEditando(true);
  }

  return(
    <div className="container mt-4">

      <h2>Modulo Director</h2>

      <form onSubmit={guardarDirector}>

        <input
          className="form-control mb-2"
          placeholder="Nombre del director"
          value={nombre}
          onChange={(e)=>setNombre(e.target.value)}
        />

        <select
          className="form-control mb-2"
          value={estado}              // ✅ ahora es string "Activo"/"Inactivo"
          onChange={(e)=>setEstado(e.target.value)}  // ✅ guarda el string directo
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>

        <button className="btn btn-primary">
          {editando ? "Actualizar" : "Guardar"}
        </button>

      </form>

      <table className="table mt-4">

        <thead>
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {directores.map((d)=>(
            <tr key={d._id}>
              <td>{d.nombres}</td>             {/* ✅ mostrar "nombres" */}
              <td>{d.estado}</td>              {/* ✅ ya es string, mostrar directo */}

              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={()=>editarDirector(d)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-danger"
                  onClick={()=>borrarDirector(d._id)}
                >
                  Eliminar
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  )
}

export default Director;