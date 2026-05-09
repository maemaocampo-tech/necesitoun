import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const colores = ["#FFA500", "#0066CC", "#CC0000", "#2E7D32", "#6A1B9A", "#00838F"];
const iconos = {
  "Electricista": "⚡",
  "Plomero": "🔧",
  "Gasista": "🔥",
  "Aire Acondicionado": "❄️",
  "Pintor": "🖌️",
  "Albanil": "🧱",
  "Cerrajero": "🔒",
  "Jardinero": "🌿",
  "Tecnico PC": "🖥️",
  "Herrero": "🛠️",
};
function Destacados() {
  const navigate = useNavigate();
  const [tecnicos, setTecnicos] = useState([]);
  const [actual, setActual] = useState(0);
  const [animando, setAnimando] = useState(false);
  const actualRef = useRef(0);

  useEffect(() => {
    const cargar = async () => {
      try {
        const q = query(collection(db, "tecnicos"), where("aprobado", "==", true));
        const snapshot = await getDocs(q);
        const lista = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setTecnicos(lista);
      } catch (error) {
        console.error(error);
      }
    };
    cargar();
  }, []);

  useEffect(() => {
    if (tecnicos.length === 0) return;
    const intervalo = setInterval(() => {
      const siguiente = (actualRef.current + 1) % tecnicos.length;
      setAnimando(true);
      setTimeout(() => {
        setActual(siguiente);
        actualRef.current = siguiente;
        setAnimando(false);
      }, 300);
    }, 4000);
    return () => clearInterval(intervalo);
  }, [tecnicos]);

  if (tecnicos.length === 0) return null;

  const tecnico = tecnicos[actual];

  return (
    <div className="mt-2">
      <p className="text-xs text-gray-400 mb-1 text-center">Tecnicos</p>
      <div
        onClick={() => navigate("/perfil/" + tecnico.id)}
        style={{ backgroundColor: colores[actual % colores.length], opacity: animando ? 0 : 1, transition: "opacity 0.3s ease" }}
        className="cursor-pointer rounded-xl p-3 shadow text-white flex flex-col gap-1"
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">{iconos[tecnico.rubro] || "🛠️"}</span>
          <div>
            <p className="font-bold text-sm">{tecnico.nombre} {tecnico.apellido}</p>
            <p className="text-xs opacity-80">{tecnico.rubro}</p>
            <p className="text-xs opacity-70">{tecnico.zona}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-1 mt-1">
        {tecnicos.map((_, i) => (
          <button key={i} onClick={() => { setActual(i); actualRef.current = i; }} className={`w-2 h-2 rounded-full transition-all ${i === actual ? "bg-blue-500 w-4" : "bg-gray-300"}`} />
        ))}
      </div>
    </div>
  );
}

export default Destacados;