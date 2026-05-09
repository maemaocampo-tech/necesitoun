import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

function Admin() {
  const navigate = useNavigate();

  const [pendientes, setPendientes] = useState([]);
  const [recientes, setRecientes] = useState([]);
  const [vista, setVista] = useState("pendientes");
  const [cargando, setCargando] = useState(true);

  const cargarPendientes = async () => {
    try {
      const q = query(
        collection(db, "tecnicos"),
        where("aprobado", "==", false)
      );

      const snapshot = await getDocs(q);

      const lista = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setPendientes(lista);
    } catch (error) {
      alert("Error al cargar pendientes");
    }
  };

  const cargarRecientes = async () => {
    try {
      const snapshot = await getDocs(collection(db, "tecnicos"));

      const lista = snapshot.docs
        .map((d) => ({
          id: d.id,
          ...d.data(),
        }))
        .sort(
          (a, b) =>
            new Date(b.fechaRegistro) - new Date(a.fechaRegistro)
        )
        .slice(0, 10);

      setRecientes(lista);
    } catch (error) {
      alert("Error al cargar recientes");
    }
  };

  useEffect(() => {
    const cargar = async () => {
      await cargarPendientes();
      await cargarRecientes();
      setCargando(false);
    };

    cargar();
  }, []);

  const aprobar = async (id) => {
    try {
      await updateDoc(doc(db, "tecnicos", id), {
        aprobado: true,
      });

      cargarPendientes();
      cargarRecientes();
    } catch (error) {
      alert("Error al aprobar");
    }
  };

  const rechazar = async (id) => {
    try {
      await deleteDoc(doc(db, "tecnicos", id));

      cargarPendientes();
      cargarRecientes();
    } catch (error) {
      alert("Error al rechazar");
    }
  };

  const TecnicoCard = ({ t, mostrarBotones }) => (
    <div className="bg-white rounded-2xl p-4 shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-bold text-gray-800">
            {t.nombre} {t.apellido}
          </p>

          <p className="text-sm text-gray-500">
            {t.rubro} - {t.zona}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            {t.descripcion}
          </p>

          <p className="text-xs text-gray-400">
            Tel: {t.telefono}
          </p>
        </div>

        <span
          className={`text-xs font-bold px-2 py-1 rounded-full ${
            t.aprobado
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {t.aprobado ? "Aprobado" : "Pendiente"}
        </span>
      </div>

      {mostrarBotones && (
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
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white p-4 shadow flex items-center justify-between">
        <h1 className="text-xl font-bold">
          Panel Admin
        </h1>

        <button
          onClick={() => navigate("/")}
          className="text-sm bg-white text-blue-600 px-3 py-1 rounded-xl font-bold"
        >
          Salir
        </button>
      </div>

      <div className="flex gap-2 p-4">
        <button
          onClick={() => setVista("pendientes")}
          className={`flex-1 py-3 rounded-xl font-bold text-sm ${
            vista === "pendientes"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-600 shadow"
          }`}
        >
          Pendientes{" "}
          {pendientes.length > 0 &&
            `(${pendientes.length})`}
        </button>

        <button
          onClick={() => setVista("recientes")}
          className={`flex-1 py-3 rounded-xl font-bold text-sm ${
            vista === "recientes"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-600 shadow"
          }`}
        >
          Ultimos 10
        </button>
      </div>

      <div className="px-4 flex flex-col gap-4">
        {cargando && (
          <p className="text-gray-400 text-center">
            Cargando...
          </p>
        )}

        {!cargando && vista === "pendientes" && (
          <>
            {pendientes.length === 0 && (
              <p className="text-gray-400 text-center mt-4">
                No hay pendientes
              </p>
            )}

            {pendientes.map((t) => (
              <TecnicoCard
                key={t.id}
                t={t}
                mostrarBotones={true}
              />
            ))}
          </>
        )}

        {!cargando && vista === "recientes" && (
          <>
            {recientes.length === 0 && (
              <p className="text-gray-400 text-center mt-4">
                No hay tecnicos
              </p>
            )}

            {recientes.map((t) => (
              <TecnicoCard
                key={t.id}
                t={t}
                mostrarBotones={false}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Admin;