// ========================================
// 3. DASHBOARD ACTUALIZADO: src/pages/InventarioDashboard.jsx
// ========================================

import { useState, useMemo } from 'react';
import { Phone, Package, Droplet, Box, DollarSign, Calendar, User, Tag } from 'lucide-react';
import { Select } from '../components/atoms/Select';
import { Modal } from '../components/molecules/Modal';
import { InfoRow } from '../components/atoms/InfoRow';
import { Button } from '../../../globals/components/atomos/Button';
import { useNavigate } from "react-router-dom";
import { useInventario } from '../../../context/InventarioContext'; // <-- IMPORTAR

export default function InventarioDashboard() {
  // Obtener datos del contexto (persistentes)
  const { productos, ingresos } = useInventario(); // <-- USAR CONTEXTO

  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showIngresoDetail, setShowIngresoDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedIngreso, setSelectedIngreso] = useState(null);
  const [filters, setFilters] = useState({ modelo: '', color: '', talla: '', sucursal: '' });
  const [filtersIngreso, setFiltersIngreso] = useState({ proveedor: '', fecha: '', sucursal: '', tipo: '' });
  const navigate = useNavigate();

  // Filtrar productos (ahora usa datos del contexto)
  const productosFiltrados = useMemo(() => {
    return productos.filter(p => {
      const matchModelo = !filters.modelo || p.producto.toLowerCase().includes(filters.modelo.toLowerCase());
      const matchColor = !filters.color || p.color.toLowerCase() === filters.color.toLowerCase();
      const matchTalla = !filters.talla || p.talla === filters.talla;
      return matchModelo && matchColor && matchTalla;
    });
  }, [filters, productos]); // <-- productos viene del contexto

  // Filtrar ingresos (ahora usa datos del contexto)
  const ingresosFiltrados = useMemo(() => {
    return ingresos.filter(ing => {
      const matchProveedor = !filtersIngreso.proveedor || ing.proveedor.toLowerCase().includes(filtersIngreso.proveedor.toLowerCase());
      const matchTipo = !filtersIngreso.tipo || ing.tipo === filtersIngreso.tipo;
      const matchSucursal = !filtersIngreso.sucursal || ing.sucursal === filtersIngreso.sucursal;
      
      let matchFecha = true;
      if (filtersIngreso.fecha) {
        const hoy = new Date();
        const fechaIngreso = new Date(ing.fecha);
        if (filtersIngreso.fecha === 'hoy') {
          matchFecha = fechaIngreso.toDateString() === hoy.toDateString();
        } else if (filtersIngreso.fecha === 'semana') {
          const unaSemanaAtras = new Date(hoy.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchFecha = fechaIngreso >= unaSemanaAtras;
        }
      }
      return matchProveedor && matchTipo && matchSucursal && matchFecha;
    });
  }, [filtersIngreso, ingresos]); // <-- ingresos viene del contexto

  const handleVerDetalleProducto = (producto) => {
    setSelectedProduct(producto);
    setShowProductDetail(true);
  };

  const handleVerDetalleIngreso = (ingreso) => {
    setSelectedIngreso(ingreso);
    setShowIngresoDetail(true);
  };

  const limpiarFiltrosProductos = () => {
    setFilters({ modelo: '', color: '', talla: '', sucursal: '' });
  };

  const limpiarFiltrosIngresos = () => {
    setFiltersIngreso({ proveedor: '', fecha: '', sucursal: '', tipo: '' });
  };

  return (
    <div className="min-h-screen bg-neutral-03 p-6">
      <div className="mx-auto">
        {/* Header */}
        <h1 className="text-l font-bold text-text-01 bg-neutral-01 rounded-4xl shadow-md p-2 px-4 flex flex-col mb-4">
        Inventario
        </h1>
        {/* Contenido principal */}
        <div className="bg-white/60 rounded-3xl  p-6">
          <div className="grid grid-cols-2 gap-8 max-w-7xl">
            
            {/* BUSCAR PRODUCTO */}
            <div className="bg-gradient-to-b from-[#1B8EF2] to-[#1675F2] rounded-2xl p-6">
              <h2 className="text-white text-xl font-bold text-center mb-5">BUSCAR PRODUCTO</h2>
              <div className="space-y-3 max-w-md mx-auto">
                <Select placeholder="Modelo" options={[{value:'nike',label:'Nike'},{value:'adidas',label:'Adidas'},{value:'nb',label:'New Balance'}]} value={filters.modelo} onChange={e => setFilters({...filters, modelo: e.target.value})} />
                <Select placeholder="Color" options={[{value:'verde',label:'Verde'},{value:'negro',label:'Negro'},{value:'blanco',label:'Blanco'},{value:'gris',label:'Gris'}]} value={filters.color} onChange={e => setFilters({...filters, color: e.target.value})} />
                <Select placeholder="Talla" options={[{value:'39',label:'39'},{value:'40',label:'40'},{value:'41',label:'41'},{value:'42',label:'42'}]} value={filters.talla} onChange={e => setFilters({...filters, talla: e.target.value})} />
                <Select placeholder="Sucursal" options={[{value:'lima',label:'Lima Centro'}]} value={filters.sucursal} onChange={e => setFilters({...filters, sucursal: e.target.value})} />
              </div>
              <div className="flex gap-3 mt-5 justify-center mt-8">
                <Button
                size="medium"
                variant="white"
                className="-mt-4 flex items-center gap-2"
                onClick={limpiarFiltrosProductos}
                >
                  Limpiar Filtros
                </Button>
                <Button
                size="medium"
                variant="white"
                className="-mt-4 flex items-center gap-2"
                >
                  Buscar
                </Button>
              </div>
            </div>

            {/* LISTA DE PRODUCTOS */}
            <div>
              <h2 className="text-xl font-bold text-[#0F172A] text-center mb-4">
                LISTA DE PRODUCTOS 
                <span className="text-sm font-normal text-gray-500 ml-2">({productosFiltrados.length} resultados)</span>
              </h2>
              <table className="w-full">
                <thead className="bg-[#1B8EF2]">
                  <tr>
                    <th className="px-3 py-2 text-xs font-medium text-white text-center">SKU</th>
                    <th className="px-3 py-2 text-xs font-medium text-white text-center">Producto</th>
                    <th className="px-3 py-2 text-xs font-medium text-white text-center">Color</th>
                    <th className="px-3 py-2 text-xs font-medium text-white text-center">Talla</th>
                    <th className="px-3 py-2 text-xs font-medium text-white text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {productosFiltrados.length > 0 ? (
                    productosFiltrados.map((p, i) => (
                      <tr key={i} className="border-b border-[#E4E7EE] hover:bg-gray-50 transition-colors">
                        <td className="px-3 py-3 text-sm text-center text-[#0F172A]">{p.sku}</td>
                        <td className="px-3 py-3 text-sm text-center text-[#0F172A]">{p.producto}</td>
                        <td className="px-3 py-3 text-sm text-center text-[#0F172A]">{p.color}</td>
                        <td className="px-3 py-3 text-sm text-center text-[#0F172A]">{p.talla}</td>
                        <td className="px-3 py-3 text-center">
                          <button onClick={() => handleVerDetalleProducto(p)} className="text-[#2FAE90] text-sm font-medium hover:underline">
                            Ver Detalle
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-3 py-6 text-sm text-center text-gray-500">
                        No se encontraron productos con los filtros seleccionados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* BUSCAR INGRESO */}
            <div className="bg-gradient-to-b from-[#1B8EF2] to-[#1675F2] rounded-2xl p-6">
              <h2 className="text-white text-xl font-bold text-center mb-5">BUSCAR INGRESO</h2>
              <div className="space-y-3 max-w-md mx-auto">
                <Select placeholder="Proveedor" options={[{value:'adidas',label:'Adidas Peru'},{value:'nike',label:'Nike Peru'},{value:'latam',label:'Adidas Latam'}]} value={filtersIngreso.proveedor} onChange={e => setFiltersIngreso({...filtersIngreso, proveedor: e.target.value})} />
                <Select placeholder="Fecha" options={[{value:'hoy',label:'Hoy'},{value:'semana',label:'Esta semana'}]} value={filtersIngreso.fecha} onChange={e => setFiltersIngreso({...filtersIngreso, fecha: e.target.value})} />
                <Select placeholder="Sucursal" options={[{value:'lima',label:'Lima Centro'}]} value={filtersIngreso.sucursal} onChange={e => setFiltersIngreso({...filtersIngreso, sucursal: e.target.value})} />
                <Select placeholder="Tipo de Ingreso" options={[{value:'compra',label:'Compra'},{value:'devolucion',label:'Devolución'}]} value={filtersIngreso.tipo} onChange={e => setFiltersIngreso({...filtersIngreso, tipo: e.target.value})} />
              </div>
              <div className="flex gap-3 mt-5 justify-center mt-8">
                <Button
                size="medium"
                variant="white"
                className="-mt-4 flex items-center gap-2"
                onClick={() => navigate("/inventario/registrarIngreso")}
                >
                  Registrar Ingreso
                </Button>
                <Button
                size="medium"
                variant="white"
                className="-mt-4 flex items-center gap-2"
                onClick={limpiarFiltrosIngresos}
                >
                  Limpiar Filtros
                </Button>
                <Button
                size="medium"
                variant="white"
                className="-mt-4 flex items-center gap-2"
                >
                  Buscar
                </Button>
              </div>
            </div>

            {/* LISTA DE INGRESOS */}
            <div>
              <h2 className="text-xl font-bold text-[#0F172A] text-center mb-4">
                LISTA DE INGRESOS
                <span className="text-sm font-normal text-gray-500 ml-2">({ingresosFiltrados.length} resultados)</span>
              </h2>
              <table className="w-full">
                <thead className="bg-[#1B8EF2]">
                  <tr>
                    <th className="px-3 py-2 text-xs font-medium text-white text-center">ID Ingreso</th>
                    <th className="px-3 py-2 text-xs font-medium text-white text-center">Proveedor</th>
                    <th className="px-3 py-2 text-xs font-medium text-white text-center">Producto</th>
                    <th className="px-3 py-2 text-xs font-medium text-white text-center">Cantidad</th>
                    <th className="px-3 py-2 text-xs font-medium text-white text-center">Detalle</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {ingresosFiltrados.length > 0 ? (
                    ingresosFiltrados.map((ing, i) => (
                      <tr key={i} className="border-b border-[#E4E7EE] hover:bg-gray-50 transition-colors">
                        <td className="px-3 py-3 text-sm text-center text-[#0F172A]">{ing.id}</td>
                        <td className="px-3 py-3 text-sm text-center text-[#0F172A]">{ing.proveedor}</td>
                        <td className="px-3 py-3 text-sm text-center text-[#0F172A]">{ing.producto}</td>
                        <td className="px-3 py-3 text-sm text-center text-[#0F172A]">{ing.cantidad}</td>
                        <td className="px-3 py-3 text-center">
                          <button onClick={() => handleVerDetalleIngreso(ing)} className="text-[#2FAE90] text-sm font-medium hover:underline">
                            Ver Detalle
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-3 py-6 text-sm text-center text-gray-500">
                        No se encontraron ingresos con los filtros seleccionados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Detalle de Producto */}
        <Modal isOpen={showProductDetail} onClose={() => setShowProductDetail(false)} title="Detalle de Producto">
          {selectedProduct && (
            <div className="space-y-5">
              {/* Datos del producto */}
              <div>
                <p className="text-sm font-semibold text-[#0F172A] mb-3 border-b border-[#E4E7EE] pb-1">Datos del producto</p>
                <div className="space-y-3">
                  <InfoRow icon={Tag} label="ID del Producto" value={selectedProduct.sku} />
                  <InfoRow icon={Package} label="Modelo" value={selectedProduct.producto} />
                  <InfoRow icon={Droplet} label="Color" value={selectedProduct.color} iconBg="bg-[#0F172A]" />
                  <InfoRow icon={Box} label="Stock Disponible" value={selectedProduct.stock} />
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#1B8EF2] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">{selectedProduct.talla}</span>
                    </div>
                    <div className="leading-tight">
                      <p className="text-xs text-[#BEC2C9]">Talla</p>
                      <p className="text-sm text-[#0F172A] font-medium">{selectedProduct.talla}</p>
                    </div>
                  </div>
                  <InfoRow icon={DollarSign} label="Costo Unitario" value={selectedProduct.costo} />
                  <InfoRow icon={Calendar} label="Ultimo Ingreso" value={selectedProduct.ultimoIngreso} />
                </div>
              </div>

              {/* Datos del Proveedor */}
              <div>
                <p className="text-sm font-semibold text-[#0F172A] mb-3 border-b border-[#E4E7EE] pb-1">Datos del Proveedor</p>
                <div className="space-y-3">
                  <InfoRow icon={User} label="Proveedor" value={selectedProduct.proveedor} />
                  <InfoRow icon={DollarSign} label="Costo Unitario" value={selectedProduct.costoProveedor} />
                  <InfoRow icon={Phone} label="Teléfono" value={selectedProduct.telefono} />
                </div>
              </div>

              {/* Ingresos Relacionados */}
              <div>
                <p className="text-sm font-semibold text-[#0F172A] mb-3 border-b border-[#E4E7EE] pb-1">Ingresos Relacionados</p>
                <table className="w-full">
                  <thead className="bg-[#1B8EF2]">
                    <tr>
                      <th className="px-2 py-2 text-xs font-medium text-white text-center">ID Ingreso</th>
                      <th className="px-2 py-2 text-xs font-medium text-white text-center">Cantidad</th>
                      <th className="px-2 py-2 text-xs font-medium text-white text-center">Costo Total (S/.)</th>
                      <th className="px-2 py-2 text-xs font-medium text-white text-center">Detalle</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {selectedProduct.ingresosRelacionados.map((ing, i) => (
                      <tr key={i} className="border-b border-[#E4E7EE]">
                        <td className="px-2 py-2 text-xs text-center text-[#0F172A]">{ing.id}</td>
                        <td className="px-2 py-2 text-xs text-center text-[#0F172A]">{ing.cantidad}</td>
                        <td className="px-2 py-2 text-xs text-center text-[#0F172A]">{ing.costo}</td>
                        <td className="px-2 py-2 text-center">
                          <button className="px-3 py-1 border border-[#F29F1B] text-[#F29F1B] rounded-full text-xs hover:bg-orange-50 transition-all">
                            Ver detalle
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Resumen del Producto */}
              <div>
                <p className="text-sm font-semibold text-[#1B8EF2] mb-2 border-b border-[#E4E7EE] pb-1">Resumen del Producto</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#0F172A]">Stock Actual</span>
                    <span className="text-[#0F172A]">{selectedProduct.stockActual}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#0F172A]">Ultimo Costo</span>
                    <span className="text-[#0F172A]">{selectedProduct.ultimoCosto}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* Modal Detalle de Ingreso */}
        <Modal isOpen={showIngresoDetail} onClose={() => setShowIngresoDetail(false)} title="Detalle de Ingreso">
          {selectedIngreso && (
            <div className="space-y-5">
              <div>
                <p className="text-sm font-semibold text-[#0F172A] mb-3 border-b border-[#E4E7EE] pb-1">Información del Ingreso</p>
                <div className="space-y-3">
                  <InfoRow icon={Tag} label="ID Ingreso" value={selectedIngreso.id} />
                  <InfoRow icon={User} label="Proveedor" value={selectedIngreso.proveedor} />
                  <InfoRow icon={Package} label="Producto" value={selectedIngreso.producto} />
                  <InfoRow icon={Box} label="Cantidad" value={`${selectedIngreso.cantidad} unidades`} />
                  <InfoRow icon={Calendar} label="Fecha" value={selectedIngreso.fecha} />
                  <InfoRow icon={Tag} label="Tipo" value={selectedIngreso.tipo === 'compra' ? 'Compra' : 'Devolución'} />
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}