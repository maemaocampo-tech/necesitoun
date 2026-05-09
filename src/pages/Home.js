import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import Destacados from "../components/Destacados";

const rubros = [
  { icono: "⚡", nombre: "Electricista" },
  { icono: "🔧", nombre: "Plomero" },
  { icono: "🔥", nombre: "Gasista" },
  { icono: "❄️", nombre: "Aire Acondicionado" },
  { icono: "🖌️", nombre: "Pintor" },
  { icono: "🧱", nombre: "Albañil" },
  { icono: "🔒", nombre: "Cerrajero" },
  { icono: "🌿", nombre: "Jardinero" },
  { icono: "🖥️", nombre: "Tecnico PC" },
  { icono: "🛠️", nombre: "Herrero" },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
<div className="bg-blue-600 text-white p-4 shadow">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">necesitoun 🛠️</h1>
            <p className="text-sm text-blue-200">Un lugar, todos los oficios.</p>
          </div>
          <div className="flex items-center gap-2">

  <div className="flex items-center text-yellow-300 font-bold text-sm animate-bounce">
    ¡Sumate!
    <span className="text-lg ml-1">➡</span>
  </div>

  <button
    onClick={() => navigate("/login-tecnico")}
    className="bg-white text-blue-600 text-xs font-bold rounded-xl px-3 py-2 shadow"
  >
    Tengo un oficio
  </button>

</div>
        </div>
      </div>

      <div className="p-4 flex gap-3">

        <div style={{width: "65%"}}>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Que rubro necesitas?</h2>
          <div className="grid grid-cols-2 gap-2">
            {rubros.map((rubro) => (
              <button
                key={rubro.nombre}
                onClick={() => navigate("/tecnicos/" + rubro.nombre)}
                className="bg-white rounded-2xl p-3 shadow text-center hover:bg-blue-50 transition"
              >
                <div className="text-2xl mb-1">{rubro.icono}</div>
                <div className="text-xs font-semibold text-gray-700">{rubro.nombre}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{width: "35%"}} className="flex flex-col gap-3 pt-8">
          <Banner />
          <Destacados />
        </div>

      </div>
    </div>
  );
}

export default Home;
