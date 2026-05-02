import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

function Admin() {
  const navigate = useNavigate();
  const [tecnicos, setTecnicos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarTecnicos = async () => {
    try {
      const snapshot = await getDocs(collection(db, "tecnicos"));
      const lista = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setTecnicos(lista);
    } catch (error) {
      alert("Error al cargar tecnicos");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTecnicos();
  }, []);

  const aprobar = async (id) => {
    try {
      await updateDoc(doc(db, "tecnicos", id), { aprobado: true });
      cargarTecnicos();
    } catch (error) {
      alert("Error al aprobar");
    }
  };

  const rechazar = async (id) => {
    try {
      await updateDoc(doc(db, "tecnicos", id), { aprobado: false });
      cargarTecnicos();
    } catch (error) {
      alert("Error al rechazar");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white p-4 shadow flex items-center justify-between">
        <h1 className="text-xl font-bold">Panel Admin</h1>
        <button onClick={() => navigate("/")} className="text-sm bg-white text-blue-600 px-3 py-1 rounded-xl font-bold">Salir</button>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Tecnicos registrados</h2>

        {cargando && <p className="text-gray-400 text-center">Cargando...</p>}

        {!cargando && tecnicos.length === 0 && (
          <p className="text-gray-400 text-center">No hay tecnicos registrados</p>
        )}

        <div className="flex flex-col gap-4">
          {tecnicos.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl p-4 shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-gray-800">{t.nombre} {t.apellido}</p>
                  <p className="text-sm text-gray-500">{t.rubro} - {t.zona}</p>
                  <p className="text-xs text-gray-400 mt-1">{t.descripcion}</p>
                  <p className="text-xs text-gray-400">Tel: {t.telefono}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${t.aprobado ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
                  {t.aprobado ? "Aprobado" : "Pendiente"}
                </span>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => aprobar(t.id)}
                  className="flex-1 bg-green-500 text-white rounded-xl py-2 text-sm font-bold"
                >
                  Aprobar
                </button>
                <button
                  onClick={() => rechazar(t.id)}
                  className="flex-1 bg-red-400 text-white rounded-xl py-2 text-sm font-bold"
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;