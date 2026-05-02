import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const destacados = [
  {
    id: 1,
    nombre: "Hector Toledo",
    rubro: "Electricista",
    emoji: "⚡",
    calificacion: 4.8,
    zona: "Lomas de Zamora",
    color: "#FFA500",
  },
  {
    id: 2,
    nombre: "Emanuel Ocampo",
    rubro: "Tecnico de PC",
    emoji: "🖥️",
    calificacion: 4.9,
    zona: "Lanus",
    color: "#0066CC",
  },
  {
    id: 3,
    nombre: "Miguel Rodriguez",
    rubro: "Gasista",
    emoji: "🔥",
    calificacion: 4.5,
    zona: "Caballito",
    color: "#CC0000",
  },
];

function Destacados() {
  const navigate = useNavigate();
  const [actual, setActual] = useState(0);
  const [animando, setAnimando] = useState(false);
  const actualRef = useRef(0);

  const cambiar = (indice) => {
    setAnimando(true);
    setTimeout(() => {
      setActual(indice);
      actualRef.current = indice;
      setAnimando(false);
    }, 300);
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      cambiar((actualRef.current + 1) % destacados.length);
    }, 4000);
    return () => clearInterval(intervalo);
  }, []);

  const tecnico = destacados[actual];

  return (
    <div className="mt-2">
      <p className="text-xs text-gray-400 mb-2 text-center">Tecnicos Destacados</p>
      <div
        onClick={() => navigate("/perfil/" + tecnico.id)}
        style={{ backgroundColor: tecnico.color, transition: "opacity 0.3s ease", opacity: animando ? 0 : 1 }}
        className="cursor-pointer rounded-xl p-3 shadow text-white flex items-center gap-3"
      >
        <div className="text-3xl">{tecnico.emoji}</div>
        <div className="flex-1">
          <p className="font-bold text-sm">{tecnico.nombre}</p>
          <p className="text-xs opacity-80">{tecnico.rubro} - {tecnico.zona}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold">Cal: {tecnico.calificacion}</p>
          <p className="text-xs opacity-70 mt-1">Ver perfil</p>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-2">
        {destacados.map((_, i) => (
          <button key={i} onClick={() => cambiar(i)} className={`w-2 h-2 rounded-full transition-all ${i === actual ? "bg-blue-500 w-4" : "bg-gray-300"}`} />
        ))}
      </div>
    </div>
  );
}

export default Destacados;