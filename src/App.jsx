import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import InicioPage from "./modules/inicio/page/InicioPage";
import Login from "./modules/login/page/Login";
import { MainLayout } from "./globals/layaout/MainLayout";
import RegistrarVentaPage from "./modules/ventas/page/RegistrarVentaPage";

import RegistrarIngresoPage from "./modules/inventario/page/RegistrarIngresoPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />

        <Route element={<MainLayout />}>
          <Route path="/inicio" element={<InicioPage />} />
          <Route path="/ventas" element={<RegistrarVentaPage />} />

          <Route path="/inventario/registrarIngreso" element={<RegistrarIngresoPage />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;