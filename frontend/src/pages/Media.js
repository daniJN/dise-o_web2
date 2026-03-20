import { useEffect, useState } from "react";
import axios from "axios";

function Media(){

  const API = "http://localhost:4000/api/medias";

  const [medias, setMedias] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  const [serial, setSerial] = useState("");
  const [titulo, setTitulo] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [url, setUrl] = useState("");
  const [imagen, setImagen] = useState("");
  const [anio, setAnio] = useState("");
  const [genero, setGenero] = useState("");
  const [director, setDirector] = useState("");
  const [productora, setProductora] = useState("");
  const [tipo, setTipo] = useState("");

  const [editando, setEditando] = useState(false);
  const [idMedia, setIdMedia] = useState(null);

  useEffect(()=>{
    cargarMedias();
    cargarDatos();
  },[]);

  const cargarMedias = async()=>{
    const res = await axios.get(API);
    setMedias(res.data.data || []);
  }

  const cargarDatos = async()=>{
    try {
      // ✅ Solo activos para géneros, directores y productoras
      const g = await axios.get("http://localhost:4000/api/generos/activos");
      const d = await axios.get("http://localhost:4000/api/directores/activos");
      const p = await axios.get("http://localhost:4000/api/productoras/activas");
      const t = await axios.get("http://localhost:4000/api/tipos");

      setGeneros(g.data.data || []);
      setDirectores(d.data.data || []);
      setProductoras(p.data.data || []);
      setTipos(t.data.data || []);
    } catch(error){
      console.error("Error cargando datos:", error);
    }
  }

  const guardarMedia = async(e)=>{
    e.preventDefault();

    if(!serial || !titulo || !sinopsis || !url || !imagen || !anio){
      alert("Todos los campos de texto son obligatorios"); return;
    }
    if(!genero || !director || !productora || !tipo){
      alert("Debes seleccionar Género, Director, Productora y Tipo"); return;
    }

    try {
      if(editando){
        await axios.put(`${API}/${idMedia}`, {
          serial, titulo, sinopsis,
          urlPelicula: url,
          imagenPortada: imagen,
          anioEstreno: anio,
          genero, director, productora, tipo
        });
      } else {
        await axios.post(API, {
          serial, titulo, sinopsis,
          urlPelicula: url,
          imagenPortada: imagen,
          anioEstreno: anio,
          genero, director, productora, tipo
        });
      }
      limpiar();
      cargarMedias();
    } catch(error){
      alert(error.response?.data?.mensaje || "Error al guardar");
    }
  }

  const editarMedia = (m)=>{
    setSerial(m.serial);
    setTitulo(m.titulo);
    setSinopsis(m.sinopsis);
    setUrl(m.urlPelicula);
    setImagen(m.imagenPortada);
    setAnio(m.anioEstreno);
    setGenero(m.genero?._id || "");
    setDirector(m.director?._id || "");
    setProductora(m.productora?._id || "");
    setTipo(m.tipo?._id || "");
    setIdMedia(m._id);
    setEditando(true);
  }

  const eliminarMedia = async(id)=>{
    if(!window.confirm("¿Eliminar esta media?")) return;
    await axios.delete(`${API}/${id}`);
    cargarMedias();
  }

  const limpiar = ()=>{
    setSerial(""); setTitulo(""); setSinopsis("");
    setUrl(""); setImagen(""); setAnio("");
    setGenero(""); setDirector(""); setProductora(""); setTipo("");
    setEditando(false); setIdMedia(null);
  }

  return(
    <div className="container mt-4">
      <h2>Modulo Media</h2>

      <form onSubmit={guardarMedia}>

        <input className="form-control mb-2" placeholder="Serial"
          value={serial} onChange={(e)=>setSerial(e.target.value)} />
        <input className="form-control mb-2" placeholder="Titulo"
          value={titulo} onChange={(e)=>setTitulo(e.target.value)} />
        <textarea className="form-control mb-2" placeholder="Sinopsis"
          value={sinopsis} onChange={(e)=>setSinopsis(e.target.value)}></textarea>
        <input className="form-control mb-2" placeholder="URL pelicula"
          value={url} onChange={(e)=>setUrl(e.target.value)} />
        <input className="form-control mb-2" placeholder="Imagen portada"
          value={imagen} onChange={(e)=>setImagen(e.target.value)} />
        <input className="form-control mb-2" placeholder="Año estreno"
          value={anio} onChange={(e)=>setAnio(e.target.value)} />

        <select className="form-control mb-2" value={genero}
          onChange={(e)=>setGenero(e.target.value)}>
          <option value="">Seleccione género (solo activos)</option>
          {generos.map((g)=>(
            <option key={g._id} value={g._id}>{g.nombre}</option>
          ))}
        </select>

        <select className="form-control mb-2" value={director}
          onChange={(e)=>setDirector(e.target.value)}>
          <option value="">Seleccione director (solo activos)</option>
          {directores.map((d)=>(
            <option key={d._id} value={d._id}>{d.nombres}</option>
          ))}
        </select>

        <select className="form-control mb-2" value={productora}
          onChange={(e)=>setProductora(e.target.value)}>
          <option value="">Seleccione productora (solo activas)</option>
          {productoras.map((p)=>(
            <option key={p._id} value={p._id}>{p.nombre}</option>
          ))}
        </select>

        <select className="form-control mb-2" value={tipo}
          onChange={(e)=>setTipo(e.target.value)}>
          <option value="">Seleccione tipo</option>
          {tipos.map((t)=>(
            <option key={t._id} value={t._id}>{t.nombre}</option>
          ))}
        </select>

        <button className="btn btn-primary me-2">
          {editando ? "Actualizar" : "Guardar"}
        </button>
        {editando && (
          <button type="button" className="btn btn-secondary" onClick={limpiar}>
            Cancelar
          </button>
        )}
      </form>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Año</th>
            <th>Género</th>
            <th>Director</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medias.map((m)=>(
            <tr key={m._id}>
              <td>{m.titulo}</td>
              <td>{m.anioEstreno}</td>
              <td>{m.genero?.nombre}</td>
              <td>{m.director?.nombres}</td>
              <td>{m.tipo?.nombre}</td>
              <td>
                <button className="btn btn-warning me-2"
                  onClick={()=>editarMedia(m)}>Editar</button>
                <button className="btn btn-danger"
                  onClick={()=>eliminarMedia(m._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Media;