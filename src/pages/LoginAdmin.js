import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginAdmin() {
  const navigate = useNavigate();

  const [clave, setClave] = useState("");

  const ingresar = () => {
    if (clave === "1729") {
      localStorage.setItem("admin", "ok");
      navigate("/admin");
    } else {
      alert("Clave incorrecta");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">

        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Admin
        </h1>

        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className="w-full border rounded-xl p-3 mb-4"
        />

        <button
          onClick={ingresar}
          className="w-full bg-blue-600 text-white rounded-xl py-3 font-bold"
        >
          Ingresar
        </button>

      </div>
    </div>
  );
}

export default LoginAdmin;