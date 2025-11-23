import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import InicioPage from "./modules/inicio/page/InicioPage";
import Login from "./modules/login/page/Login";
import { MainLayout } from "./globals/layaout/MainLayout";
import RegistrarVentaPage from "./modules/ventas/page/RegistrarVentaPage";
import RegistrarIngresoPage from "./modules/inventario/page/RegistrarIngresoPage";
import Reportes from "./modules/reportes/pages/Reportes";
import VentasDashboard from "./modules/ventasDashboard/page/VentasDashboard";
import InventarioDashboard from "./modules/inventarioDashboard/page/InventarioDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />

        <Route element={<MainLayout />}>
          <Route path="/inicio" element={<InicioPage />} />
          <Route path="/ventas/registrar" element={<RegistrarVentaPage />} />
          <Route path='/inventario' element={<InventarioDashboard />} />
          <Route path="/inventario/registrarIngreso" element={<RegistrarIngresoPage />} />
          <Route path='/reportes' element={<Reportes />} />
          <Route path='/ventas' element={<VentasDashboard />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;