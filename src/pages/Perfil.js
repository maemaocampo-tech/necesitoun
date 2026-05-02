import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, collection, addDoc, query, where, getDocs } from "firebase/firestore";
function Perfil() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tecnico, setTecnico] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState({ nombre: "", email: "", estrellas: 5, texto: "" });
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      try {
        const ref = doc(db, "tecnicos", id);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          setTecnico({ id: snapshot.id, ...snapshot.data() });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };
cargar();
  }, [id]);

useEffect(() => {
    const cargarComentarios = async () => {
      try {
        const q = query(collection(db, "comentarios"), where("tecnicoId", "==", id));
        const snapshot = await getDocs(q);
        const lista = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setComentarios(lista);
      } catch (error) {
        console.error(error);
      }
    };
    cargarComentarios();
  }, [id]);
  const enviarComentario = async () => {
    if (!nuevoComentario.nombre || !nuevoComentario.texto) {
      alert("Por favor completa tu nombre y comentario");
      return;
    }
    setEnviando(true);
    try {
      await addDoc(collection(db, "comentarios"), {
        tecnicoId: id,
        nombre: nuevoComentario.nombre,
        email: nuevoComentario.email,
        estrellas: nuevoComentario.estrellas,
        texto: nuevoComentario.texto,
        fecha: new Date().toISOString(),
      });
      setNuevoComentario({ nombre: "", estrellas: 5, texto: "" });
      const q = query(collection(db, "comentarios"), where("tecnicoId", "==", id));
      const snapshot = await getDocs(q);
      const lista = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setComentarios(lista);
    } catch (error) {
      alert("Error al enviar comentario");
    } finally {
      setEnviando(false);
    }
  };

  if (cargando) return <div className="p-6 text-center text-gray-400">Cargando...</div>;
  if (!tecnico) return <div className="p-6 text-center text-gray-400">Tecnico no encontrado</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white p-4 shadow flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-white text-xl">Volver</button>
        <h1 className="text-xl font-bold">Perfil del tecnico</h1>
      </div>

      <div className="p-6 flex flex-col gap-4">

        <div className="bg-white rounded-2xl p-6 shadow text-center">
{tecnico.foto ? (
            <img src={tecnico.foto} alt={tecnico.nombre} className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-4 border-blue-100" referrerPolicy="no-referrer" />
          ) : (
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center text-4xl mx-auto mb-3">
              T
            </div>
          )}
          <h2 className="text-xl font-bold text-gray-800">{tecnico.nombre} {tecnico.apellido}</h2>
          <p className="text-gray-500 text-sm mt-1">{tecnico.descripcion}</p>
          <div className="flex justify-center gap-4 mt-3">
            <span className="text-sm text-gray-600">Rubro: {tecnico.rubro}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow">
          <h3 className="font-semibold text-gray-700 mb-1">Zona de trabajo</h3>
          <p className="text-gray-500 text-sm">{tecnico.zona}</p>
        </div>

        <a
href={"https://wa.me/54" + tecnico.telefono}
          className="bg-green-500 text-white rounded-2xl p-4 font-bold text-center shadow block"
        >
          Contactar por WhatsApp
        </a>

        <div className="bg-white rounded-2xl p-4 shadow">
          <h3 className="font-semibold text-gray-700 mb-3">Comentarios ({comentarios.length})</h3>
          {comentarios.length === 0 && (
            <p className="text-gray-400 text-sm text-center">Sin comentarios aun</p>
          )}
          <div className="flex flex-col gap-3 mb-4">
            {comentarios.map((c) => (
<div key={c.id} className="border-b pb-3 last:border-0">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm text-gray-700">{c.nombre}</span>
                  <span className="text-yellow-400 text-sm">{"★".repeat(c.estrellas)}</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">{c.texto}</p>
                <button
                  onClick={() => {
                    if (window.confirm("Reportar este comentario como inapropiado?")) {
                      addDoc(collection(db, "reportes"), {
                        comentarioId: c.id,
                        tecnicoId: id,
                        fecha: new Date().toISOString(),
                      }).then(() => alert("Reporte enviado. Lo revisaremos pronto."));
                    }
                  }}
                  className="text-xs text-gray-300 mt-1 hover:text-red-400 transition"
                >
                  Reportar
                </button>
              </div>
            ))}
          </div>

          <h4 className="font-semibold text-gray-700 mb-2">Dejar un comentario</h4>
          <div className="flex flex-col gap-2">
<input
              placeholder="Tu nombre"
              value={nuevoComentario.nombre}
              onChange={(e) => setNuevoComentario({ ...nuevoComentario, nombre: e.target.value })}
              className="border border-gray-200 rounded-xl p-2 text-sm"
            />
            <input
              placeholder="Tu email (no se publicara)"
              type="email"
              value={nuevoComentario.email}
              onChange={(e) => setNuevoComentario({ ...nuevoComentario, email: e.target.value })}
              className="border border-gray-200 rounded-xl p-2 text-sm"
            />
            <select
              value={nuevoComentario.estrellas}
              onChange={(e) => setNuevoComentario({ ...nuevoComentario, estrellas: parseInt(e.target.value) })}
              className="border border-gray-200 rounded-xl p-2 text-sm"
            >
              <option value={5}>5 estrellas</option>
              <option value={4}>4 estrellas</option>
              <option value={3}>3 estrellas</option>
              <option value={2}>2 estrellas</option>
              <option value={1}>1 estrella</option>
            </select>
            <textarea
              placeholder="Tu comentario..."
              value={nuevoComentario.texto}
              onChange={(e) => setNuevoComentario({ ...nuevoComentario, texto: e.target.value })}
              rows={3}
              className="border border-gray-200 rounded-xl p-2 text-sm"
            />
            <button
              onClick={enviarComentario}
              disabled={enviando}
              className="bg-blue-600 text-white rounded-xl p-3 font-bold text-sm"
            >
              {enviando ? "Enviando..." : "Enviar comentario"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Perfil;