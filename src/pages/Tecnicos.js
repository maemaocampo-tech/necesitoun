import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function Tecnicos() {
  const navigate = useNavigate();
  const { rubro } = useParams();
  const [tecnicos, setTecnicos] = useState([]);
  const [todosLosTecnicos, setTodosLosTecnicos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroZona, setFiltroZona] = useState("");

  useEffect(() => {
    const cargar = async () => {
      try {
        const q = query(
          collection(db, "tecnicos"),
          where("aprobado", "==", true),
          where("rubro", "==", rubro)
        );
        const snapshot = await getDocs(q);
        const lista = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setTodosLosTecnicos(lista);
        setTecnicos(lista);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, [rubro]);

  const filtrar = (texto) => {
    setFiltroZona(texto);
    if (!texto.trim()) {
      setTecnicos(todosLosTecnicos);
      return;
    }
    const filtrado = todosLosTecnicos.filter(t =>
      t.zona.toLowerCase().includes(texto.toLowerCase())
    );
    setTecnicos(filtrado);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white p-4 shadow flex items-center gap-3">
        <button onClick={() => navigate("/")} className="text-white text-xl">Volver</button>
        <div>
          <h1 className="text-xl font-bold">{rubro}</h1>
          <p className="text-sm text-blue-200">Tecnicos disponibles</p>
        </div>
      </div>

      <div className="p-4">
        <input
          placeholder="Filtrar por zona (ej: Lanus, Palermo...)"
          value={filtroZona}
          onChange={(e) => filtrar(e.target.value)}
          className="w-full border border-gray-200 rounded-xl p-3 text-sm mb-4 bg-white shadow"
        />

        {cargando && <p className="text-gray-400 text-center mt-10">Cargando...</p>}

        {!cargando && tecnicos.length === 0 && (
          <div className="text-center mt-10">
            <p className="text-gray-400 text-lg">No hay tecnicos en esa zona</p>
            <p className="text-gray-300 text-sm mt-1">Proba con otra zona cercana</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {tecnicos.map((tecnico) => (
            <button
              key={tecnico.id}
              onClick={() => navigate("/perfil/" + tecnico.id)}
              className="bg-white rounded-2xl p-4 shadow text-left flex items-center gap-4"
            >
              <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center text-2xl">
                {tecnico.foto ? (
                  <img src={tecnico.foto} alt={tecnico.nombre} className="w-14 h-14 rounded-full object-cover" referrerPolicy="no-referrer" />
                ) : "T"}
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-800">{tecnico.nombre} {tecnico.apellido}</div>
                <div className="text-sm text-gray-500">{tecnico.zona}</div>
                <div className="text-xs text-green-500 font-semibold mt-1">Disponible</div>
              </div>
              <div className="text-gray-400 text-xl">›</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tecnicos;