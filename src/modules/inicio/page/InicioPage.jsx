// --- Datos de ejemplo (DUMMY DATA) ---

import DashboardTableCard from "../components/organismos/DashboardTableCard";
import UserInfoCard from "../components/organismos/UserInfoCard";

// --- (Los datos de ejemplo DUMMY DATA se mantienen igual) ---
const inventarioData = {
  headers: ["ID Ingreso", "Total (S/.)", "N° Productos"],
  data: [
    ["10001", "2300.00", 9],
    ["10002", "4200.00", 14],
    ["10003", "3200.80", 12],
    ["10004", "4523.87", 12],
    ["10005", "3241.00", 15],
  ]
};

const ventasData = {
  headers: ["ID Venta", "Total (S/.)", "N° Productos"],
  data: [
    ["20001", "570.80", 2],
    ["20002", "359.90", 1],
    ["20003", "590.80", 2],
  ]
};

const devolucionesData = {
  headers: ["ID Venta", "Motivo", "N° Productos"],
  data: [
    ["20003", "Talla", 1],
  ]
};

const InicioPage = () => {
  return (
    <main className="flex-grow p-6 bg-neutral-03">
      <h1 className="text-l font-bold text-text-01 bg-neutral-01 rounded-4xl shadow-md p-2 px-4 flex flex-col h-full mb-4">
        Inicio
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        
        {/* Fila 1, Col 1 */}
        <UserInfoCard />
        
        {/* Fila 1, Col 2 */}
        <DashboardTableCard 
          title="Últimos Ingresos de Inventario"
          headers={inventarioData.headers}
          data={inventarioData.data}
          buttonText="Ir a Inventario"
        />
        
        {/* Fila 2, Col 1 */}
        <DashboardTableCard 
          title="Últimas Ventas"
          headers={ventasData.headers}
          data={ventasData.data}
          buttonText="Ir a Ventas"
        />
        
        {/* Fila 2, Col 2 */}
        <DashboardTableCard 
          title="Últimas Devoluciones"
          headers={devolucionesData.headers}
          data={devolucionesData.data}
          buttonText="Ir a Ventas"
        />
        
      </div>
    </main>
  );
};

export default InicioPage;