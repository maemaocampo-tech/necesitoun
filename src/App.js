import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tecnicos from "./pages/Tecnicos";
import Perfil from "./pages/Perfil";
import RegistroTecnico from "./pages/RegistroTecnico";
import LoginTecnico from "./pages/LoginTecnico";
import Admin from "./pages/Admin";
import LoginAdmin from "./pages/LoginAdmin";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tecnicos/:rubro" element={<Tecnicos />} />
        <Route path="/perfil/:id" element={<Perfil />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/registro-tecnico" element={<RegistroTecnico />} />
        <Route path="/login-tecnico" element={<LoginTecnico />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;