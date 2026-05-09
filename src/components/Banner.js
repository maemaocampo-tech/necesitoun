import { useState, useEffect } from "react";

const anunciantes = [
  {
    id: 1,
    nombre: "Ferreteria Gonzalez",
    telefono: "1112345678",
    direccion: "Av. Corrientes 1234, Buenos Aires",
    color: "#FF6B00",
    emoji: "🔧",
  },
  {
    id: 2,
    nombre: "Corralon San Martin",
    telefono: "1187654321",
    direccion: "Av. San Martin 567, Buenos Aires",
    color: "#0066CC",
    emoji: "🧱",
  },
];

function Banner() {
  const [actual, setActual] = useState(0);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [animando, setAnimando] = useState(false);

  const cambiar = (indice) => {
    setAnimando(true);
    setTimeout(() => {
      setActual(indice);
      setAnimando(false);
    }, 300);
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      cambiar((actual + 1) % anunciantes.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, [actual]);

  const anunciante = anunciantes[actual];

  return (
    <div className="mt-2">
      <p className="text-xs text-gray-400 mb-1 text-center">Publicidad</p>
      <div
        onClick={() => setModalAbierto(true)}
        style={{ backgroundColor: anunciante.color, opacity: animando ? 0 : 1, transition: "opacity 0.3s ease", height: "190px" }}
        className="cursor-pointer rounded-2xl shadow-lg text-white flex flex-col items-center justify-center gap-1 p-2"
      >
        <p className="text-lg font-bold text-center leading-tight">Publicite Aqui !!</p>
      </div>
      <div className="flex justify-center gap-1 mt-1">
        {anunciantes.map((_, i) => (
          <button key={i} onClick={() => cambiar(i)} className={`w-2 h-2 rounded-full transition-all ${i === actual ? "bg-blue-500 w-4" : "bg-gray-300"}`} />
        ))}
      </div>
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm">
            <div className="text-5xl text-center mb-3">{anunciante.emoji}</div>
            <h3 className="text-xl font-bold text-gray-800 text-center">{anunciante.nombre}</h3>
            <p className="text-gray-500 text-sm mt-2 text-center">{anunciante.direccion}</p>
            <a href={"https://wa.me/54" + anunciante.telefono} className="block mt-4 bg-green-500 text-white text-center rounded-xl py-3 font-bold">WhatsApp</a>
            <button onClick={() => setModalAbierto(false)} className="block w-full mt-2 text-center text-gray-400 text-sm py-2">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Banner;