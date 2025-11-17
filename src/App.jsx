import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import InicioPage from "./modules/inicio/page/InicioPage";
import Login from "./modules/login/page/Login";
import { MainLayout } from "./globals/layaout/MainLayout";
import RegistrarVentaPage from "./modules/ventas/page/RegistrarVentaPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />

        <Route element={<MainLayout />}>
          <Route path="/inicio" element={<InicioPage />} />
          <Route path="/ventas" element={<RegistrarVentaPage />} />
        </Route>

      </Routes> 
    </Router>
  );
}

export default App;