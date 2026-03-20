import { useEffect, useState } from "react";
import { getGeneros, crearGenero, eliminarGenero, actualizarGenero } from "../services/generoService";

function Genero(){

  const [generos,setGeneros] = useState([]);

  const [nombre,setNombre] = useState("");
  const [descripcion,setDescripcion] = useState("");

  const [editando, setEditando] = useState(false);
  const [idGenero, setIdGenero] = useState(null);

  useEffect(()=>{
    cargarGeneros();
  },[]);

  // ✅ CARGAR GENEROS
  const cargarGeneros = async ()=>{
    try {
      const res = await getGeneros();
      console.log("RESPUESTA:", res.data);

      // 👇 AQUÍ ESTÁ LA CLAVE (tu backend usa data)
      setGeneros(res.data.data || []);

    } catch (error) {
      console.error("ERROR AL CARGAR:", error);
      setGeneros([]);
    }
  }

  // ✅ GUARDAR Y EDITAR
  const guardarGenero = async (e)=>{
    e.preventDefault();

    // validación
    if(!nombre || !descripcion){
      alert("Todos los campos son obligatorios");
      return;
    }

    try {

      console.log("ENVIANDO:", {
        nombre,
        descripcion,
        estado: true
      });

      if(editando){
        await actualizarGenero(idGenero,{
          nombre,
          descripcion,
          estado: 'Activo'
        });
      } else {
        await crearGenero({
          nombre,
          descripcion,
          estado: 'Activo'
        });
      }

      // limpiar formulario
      setNombre("");
      setDescripcion("");
      setEditando(false);
      setIdGenero(null);

      cargarGeneros();

    } catch (error) {
      console.error("ERROR COMPLETO:", error);
      console.log("RESPUESTA BACKEND:", error.response?.data);
      alert("Error al guardar. Revisa la consola.");
    }
  }

  // ✅ ELIMINAR
  const borrarGenero = async(id)=>{
    try {
      await eliminarGenero(id);
      cargarGeneros();
    } catch (error) {
      console.error("ERROR AL ELIMINAR:", error);
    }
  }

  // ✅ EDITAR
  const editarGenero = (g)=>{
    setNombre(g.nombre);
    setDescripcion(g.descripcion);
    setIdGenero(g._id);
    setEditando(true);
  }

  return(
    <div className="container mt-4">

      <h2>Modulo Genero</h2>

      <form onSubmit={guardarGenero}>

        <input
          className="form-control mb-2"
          placeholder="Nombre"
          value={nombre}
          onChange={(e)=>setNombre(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          placeholder="Descripcion"
          value={descripcion}
          onChange={(e)=>setDescripcion(e.target.value)}
        ></textarea>

        <button className="btn btn-primary">
          {editando ? "Actualizar" : "Guardar"}
        </button>

      </form>

      <table className="table mt-4">

        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>

          {Array.isArray(generos) && generos.length > 0 ? (
            generos.map((g)=>(
              <tr key={g._id}>
                <td>{g.nombre}</td>
                <td>{g.descripcion}</td>

                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={()=>editarGenero(g)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={()=>borrarGenero(g._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay géneros</td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  )
}

export default Genero;