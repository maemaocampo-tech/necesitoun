import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const rubros = [
  "Electricista",
  "Plomero",
  "Gasista",
  "Aire Acondicionado",
  "Pintor",
  "Albañil",
  "Cerrajero",
  "Jardinero",
  "Tecnico PC",
];

function RegistroTecnico() {
  const navigate = useNavigate();
const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    rubro: "",
    descripcion: "",
    zona: "",
    telefono: "",
    foto: auth.currentUser ? auth.currentUser.photoURL : "",
  });

  const actualizar = (campo, valor) => {
    setForm({ ...form, [campo]: valor });
  };

const enviar = async () => {
    if (!form.nombre || !form.apellido || !form.rubro || !form.zona) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }
    try {
      const { collection, addDoc } = await import("firebase/firestore");
      const { db } = await import("../firebase");
      await addDoc(collection(db, "tecnicos"), {
        ...form,
        aprobado: false,
        fechaRegistro: new Date().toISOString(),
      });
      alert("Perfil enviado! Te avisaremos cuando sea aprobado.");
      navigate("/");
    } catch (error) {
      alert("Error al enviar. Intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white p-4 shadow flex items-center gap-3">
        <button onClick={() => navigate("/")} className="text-white text-xl">←</button>
        <div>
          <h1 className="text-xl font-bold">Registro de Tecnico</h1>
          <p className="text-sm text-blue-200">Completa tu perfil profesional</p>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-4">

        <div className="bg-white rounded-2xl p-4 shadow flex flex-col gap-3">
          <h2 className="font-bold text-gray-700">Datos personales</h2>
          <input
            placeholder="Nombre *"
            value={form.nombre}
            onChange={(e) => actualizar("nombre", e.target.value)}
            className="border border-gray-200 rounded-xl p-3 text-sm w-full"
          />
          <input
            placeholder="Apellido *"
            value={form.apellido}
            onChange={(e) => actualizar("apellido", e.target.value)}
            className="border border-gray-200 rounded-xl p-3 text-sm w-full"
          />
        <input
            placeholder="Zonas donde trabajas (ej: Lanus, Avellaneda, Lomas) *"
            value={form.zona}
            onChange={(e) => actualizar("zona", e.target.value)}
            className="border border-gray-200 rounded-xl p-3 text-sm w-full"
          />
          <input
            placeholder="Telefono / WhatsApp *"
            type="number"
            value={form.telefono}
            onChange={(e) => actualizar("telefono", e.target.value)}
            className="border border-gray-200 rounded-xl p-3 text-sm w-full"
          />
        </div>

        <div className="bg-white rounded-2xl p-4 shadow flex flex-col gap-3">
          <h2 className="font-bold text-gray-700">Datos profesionales</h2>
          <select
            value={form.rubro}
            onChange={(e) => actualizar("rubro", e.target.value)}
            className="border border-gray-200 rounded-xl p-3 text-sm w-full"
          >
            <option value="">Selecciona tu rubro *</option>
            {rubros.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <input
            placeholder="Zona donde trabajas *"
            value={form.zona}
            onChange={(e) => actualizar("zona", e.target.value)}
            className="border border-gray-200 rounded-xl p-3 text-sm w-full"
          />
          <textarea
            placeholder="Describe tu experiencia, especialidades, años de trabajo..."
            value={form.descripcion}
            onChange={(e) => actualizar("descripcion", e.target.value)}
            rows={4}
            className="border border-gray-200 rounded-xl p-3 text-sm w-full"
          />
        </div>

        <button
          onClick={enviar}
          className="bg-blue-600 text-white rounded-2xl p-4 font-bold text-center shadow"
        >
          Enviar perfil para aprobacion
        </button>

        <p className="text-xs text-gray-400 text-center">
          Tu perfil sera revisado antes de aparecer en la app
        </p>

      </div>
    </div>
  );
}

export default RegistroTecnico;