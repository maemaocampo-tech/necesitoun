import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function LoginTecnico() {
  const navigate = useNavigate();

  const loginGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/registro-tecnico");
    } catch (error) {
      alert("Error al iniciar sesion. Intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-blue-600 text-white p-4 shadow flex items-center gap-3">
        <button onClick={() => navigate("/")} className="text-white text-xl">Volver</button>
        <h1 className="text-xl font-bold">Acceso Tecnicos</h1>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 shadow w-full max-w-sm text-center">
          <div className="text-6xl mb-4">👷</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Sos tecnico?</h2>
          <p className="text-gray-500 text-sm mb-8">Registrate y aparece en NecesitoUn. Es gratis.</p>
          <button
            onClick={loginGoogle}
            className="w-full bg-white border-2 border-gray-200 rounded-2xl p-4 flex items-center justify-center gap-3 shadow hover:bg-gray-50 transition"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            <span className="font-bold text-gray-700">Continuar con Google</span>
          </button>
          <p className="text-xs text-gray-400 mt-4">Tu perfil sera revisado antes de aparecer en la app</p>
        </div>
      </div>
    </div>
  );
}

export default LoginTecnico;