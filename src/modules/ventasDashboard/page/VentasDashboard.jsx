import { useState, useMemo } from 'react';
import { SectionTitle } from '../components/molecules/SectionTitle';
import { Input } from '../components/atoms/Input';
import { Select } from '../components/atoms/Select';
import { StatCard } from '../components/molecules/StatCard';
import { Modal } from '../components/organisms/Modal';
import { InfoRow } from '../components/molecules/InfoRow';
import { Checkbox } from '../components/atoms/Checkbox';
import { SuccessModal } from '../components/organisms/SuccessModal';
import { Plus, Trash2, MessageSquare, Phone, User, CreditCard, MapPin, Edit3, Hash, Banknote, TrendingUp } from 'lucide-react';
import { HiOutlineTrash, HiPlus } from 'react-icons/hi2';
import { DashboardCardHeader } from '../../inicio/components/moleculas/DashboardCardHeader';
import { Button } from '../../../globals/components/atomos/Button';
import { useNavigate } from "react-router-dom";
import { useVentas } from '../../../context/VentasContext';
import { FaInfoCircle } from "react-icons/fa";



export default function VentasDashboard() {
  const { ventas, registrarDevolucion, ventasDelDia } = useVentas();
  
  const [filters, setFilters] = useState({ 
    id: '', 
    nombre: '', 
    doc: '', 
    canal: '', 
    sucursal: '', 
    metodo: '' 
  });
  
  const [showDetail, setShowDetail] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  // Filtrar ventas según los filtros aplicados
  const ventasFiltradas = useMemo(() => {
    return ventas.filter(venta => {
      const matchId = !filters.id || venta.id.toLowerCase().includes(filters.id.toLowerCase());
      const matchNombre = !filters.nombre || venta.clienteFull.toLowerCase().includes(filters.nombre.toLowerCase());
      const matchDoc = !filters.doc || venta.dni.includes(filters.doc);
      const matchCanal = !filters.canal || venta.canal.toLowerCase().replace(' ', '') === filters.canal.toLowerCase();
      const matchSucursal = !filters.sucursal || 
        (filters.sucursal === 'nofisico' && venta.sucursal === 'No físico') ||
        (filters.sucursal === 'lima' && venta.sucursal === 'Lima Centro');
      const matchMetodo = !filters.metodo || venta.metodo.toLowerCase() === filters.metodo.toLowerCase();
      
      return matchId && matchNombre && matchDoc && matchCanal && matchSucursal && matchMetodo;
    });
  }, [ventas, filters]);

  // Abrir modal de detalle
  const handleVerDetalle = (venta) => {
    setSelectedSale(venta);
    setShowDetail(true);
  };

  // Abrir modal de devolución
  const handleDevolucion = (venta) => {
    setSelectedSale(venta);
    setSelectedItems([]);
    setShowReturn(true);
  };

  // Ver detalle de producto específico
  const handleVerProducto = (producto) => {
    setSelectedProduct(producto);
    setShowDetail(false);
    setShowProduct(true);
  };

  // Toggle selección de items para devolución
  const toggleItem = (i) => {
    setSelectedItems(prev => 
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );
  };

  // Confirmar devolución
  const handleConfirmarDevolucion = () => {
    if (selectedSale && selectedItems.length > 0) {
      registrarDevolucion(selectedSale.id, selectedItems);
      setShowReturn(false);
      setShowSuccess(true);
      setSelectedItems([]);
    }
  };

  // Calcular total del día
  const totalDelDia = ventasDelDia();

  return (
    <div className="min-h-screen bg-neutral-03 p-6">
      <div className="mx-auto">
        {/* Header */}
        <h1 className="text-l font-bold text-text-01 bg-neutral-01 rounded-4xl shadow-md p-2 px-4 flex flex-col mb-4">
          Ventas
        </h1>

        {/* Buscar Venta + Stats */}
        <div className="flex gap-5 mb-5 bg-white p-5 shadow-sm border border-[#E4E7EE] rounded-2xl">
          <div className="flex-1 bg-white rounded-xl">
            <div className="mb-5">
              <DashboardCardHeader title="Buscar Venta" />
            </div>
            <div className="grid grid-cols-3 gap-x-6 gap-y-4">
              <Input 
                title='ID Venta'
                label="ID Venta" 
                placeholder="ID Venta" 
                value={filters.id} 
                onChange={e => setFilters({...filters, id: e.target.value})} 
              />
              <Input 
                title='Nombre Cliente'
                label="Nombre Cliente" 
                placeholder="Nombre Cliente" 
                value={filters.nombre} 
                onChange={e => setFilters({...filters, nombre: e.target.value})} 
              />
              <Input 
                title='Doc. Identidad'
                label="Doc. Identidad" 
                placeholder="DNI / RUC" 
                value={filters.doc} 
                onChange={e => setFilters({...filters, doc: e.target.value})} 
              />
              <Select
                title='Canal' 
                label="Canal" 
                options={[
                  {value:'', label:'Todos'},
                  {value:'tiktok', label:'Tik Tok'},
                  {value:'instagram', label:'Instagram'}
                ]} 
                value={filters.canal} 
                onChange={e => setFilters({...filters, canal: e.target.value})} 
              />
              <Select 
                title='Sucursal'
                label="Sucursal" 
                options={[
                  {value:'', label:'Todas'},
                  {value:'nofisico', label:'No físico'},
                  {value:'lima', label:'Lima Centro'}
                ]} 
                value={filters.sucursal} 
                onChange={e => setFilters({...filters, sucursal: e.target.value})}
              />
              <Select 
                title='Metodo de Pago'
                label="Metodo de Pago" 
                options={[
                  {value:'', label:'Todos'},
                  {value:'yape', label:'Yape'},
                  {value:'plin', label:'Plin'}
                ]} 
                value={filters.metodo} 
                onChange={e => setFilters({...filters, metodo: e.target.value})} 
              />
            </div>
          </div>
          <StatCard icon={Banknote} title="Ventas del día" value={`S/. ${totalDelDia.toFixed(2)}`} />
          <StatCard icon={TrendingUp} title="Total ventas" value={ventas.length} />
        </div>

        {/* Lista de Ventas */}
        <div className="bg-white rounded-xl border border-[#E4E7EE] shadow-sm overflow-hidden max-h-[800px]">

          {/* Header */}
          <div className="p-5 flex items-center justify-between">
            <div className='w-full pr-6'>
              <DashboardCardHeader title="Lista de Ventas"/>
            </div>
            <Button
              size="medium"
              variant="secondaryUNO"
              className="-mt-4 flex items-center justify-between gap-2 whitespace-nowrap "
              onClick={() => navigate("/ventas/registrar")}
              icon={<HiPlus className='h-6 w-6'></HiPlus>}
            >
              Registrar Venta
            </Button>
          </div>

          {/* Tabla */}
          <div className="max-h-[600px] overflow-y-auto">
            <table className="w-full">
              <thead className="bg-[#1B8EF2] sticky top-0 z-10">
                <tr>
                  <th className="px-2 py-3 text-xs font-medium text-white text-center">ID Venta</th>
                  <th className="px-2 py-3 text-xs font-medium text-white text-center">Nombre Cliente</th>
                  <th className="px-2 py-3 text-xs font-medium text-white text-center">Doc Identidad</th>
                  <th className="px-2 py-3 text-xs font-medium text-white text-center">Canal</th>
                  <th className="px-2 py-3 text-xs font-medium text-white text-center">Metodo de Pago</th>
                  <th className="px-2 py-3 text-xs font-medium text-white text-center">Total (S/.)</th>
                  <th className="px-8 py-3 text-xs font-medium text-white text-center">Detalle</th>
                  <th className="px-8 py-3 text-xs font-medium text-white text-center">Acción</th>
                </tr>
              </thead>

              <tbody>
                {ventasFiltradas.length > 0 ? (
                  ventasFiltradas.map((venta) => (
                    <tr key={venta.id} className="border-b border-[#E4E7EE]">
                      <td className="px-2 py-4 text-sm text-center text-[#0F172A]">{venta.id}</td>
                      <td className="px-2 py-4 text-sm text-center text-[#0F172A]">{venta.cliente}</td>
                      <td className="px-2 py-4 text-sm text-center text-[#0F172A]">{venta.dni}</td>
                      <td className="px-2 py-4 text-sm text-center text-[#0F172A]">{venta.canal}</td>
                      <td className="px-2 py-4 text-sm text-center text-[#0F172A]">{venta.metodo}</td>
                      <td className="px-2 py-4 text-sm text-center text-[#0F172A]">
                        {venta.total.toFixed(2)}
                      </td>

                      <td className="px-0 py-4 text-center">
                        <Button
                          size="small"
                          variant="white"
                          onClick={() => handleVerDetalle(venta)}
                          icon={<FaInfoCircle className="w-5 h-5" />}
                          iconPosition="right"
                        >
                          Ver Detalle
                        </Button>
                      </td>

                      <td className="px-0 py-4 text-center">
                        <Button
                          size="small"
                          variant="whiteRed"
                          onClick={() => handleDevolucion(venta)}
                          disabled={venta.productos.length === 0}
                          icon={<HiOutlineTrash className='w-5 h-5'></HiOutlineTrash>}
                          iconPosition='right'
                        >
                          Devolución
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                      No se encontraron ventas con los filtros aplicados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>


          {/* SOLO Tbody con Scroll */}
          
        </div>

        {/* Modal Detalle de Venta */}
        <Modal isOpen={showDetail} onClose={() => setShowDetail(false)} title="Detalle de Venta" width="max-w-xl">
          {selectedSale && (
            <div className="space-y-5">
              <div>
                <p className="text-xl font-semibold text-[#0F172A]">Datos de la venta</p>
                <hr className="border-text-02 border-1 mb-3" />
                <div className="space-y-3">
                  <InfoRow icon={Edit3} label="ID de la Venta" value={selectedSale.id} />
                  <InfoRow icon={Hash} label="Canal" value={selectedSale.canal} />
                  <InfoRow icon={MapPin} label="Sucursal" value={selectedSale.sucursal} />
                  <InfoRow icon={CreditCard} label="Método de pago" value={selectedSale.metodo} />
                  <InfoRow icon={User} label="Vendedor" value={selectedSale.vendedor} />
                </div>
              </div>
              
              <div>
                <p className="text-xl font-semibold text-[#0F172A]">Datos del Cliente</p>
                <hr className="border-text-02 border-1 mb-3" />
                <div className="space-y-3">
                  <InfoRow icon={User} label="Nombre completo" value={selectedSale.clienteFull} />
                  <InfoRow icon={CreditCard} label="DNI" value={selectedSale.dni} />
                  <InfoRow icon={Phone} label="Teléfono" value={selectedSale.telefono} />
                </div>
              </div>

              <div>
                <p className="text-xl font-semibold text-[#0F172A]">Productos Vendidos</p>
                <hr className="border-text-02 border-1 mb-3" />
                <table className="w-full">
                  <thead className="bg-[#1B8EF2]">
                    <tr>
                      <th className="px-2 py-2 text-xs font-medium text-white text-center">Modelo</th>
                      <th className="px-2 py-2 text-xs font-medium text-white text-center">Cantidad</th>
                      <th className="px-2 py-2 text-xs font-medium text-white text-center">Subtotal (S/.)</th>
                      <th className="px-2 py-2 text-xs font-medium text-white text-center">Detalle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSale.productos.map((producto, index) => (
                      <tr key={index} className="border-b border-[#E4E7EE]">
                        <td className="px-2 py-2 text-xs text-center text-[#0F172A]">{producto.modelo}</td>
                        <td className="px-2 py-2 text-xs text-center text-[#0F172A]">{producto.cantidad}</td>
                        <td className="px-2 py-2 text-xs text-center text-[#0F172A]">{producto.subtotal.toFixed(2)}</td>
                        <td className="px-2 py-2 text-center">
                          <button 
                            onClick={() => handleVerProducto(producto)}
                            className="px-3 py-1 bg-[#1B8EF2] text-white rounded-full text-xs hover:bg-[#1675F2] transition-all"
                          >
                            Ver detalle
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#0F172A]">Resumen</p>
                <hr className="border-text-02 border-1 mb-3" />
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#0F172A]">Subtotal</span>
                    <span className="text-[#0F172A]">S/.{selectedSale.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#1B8EF2]">Descuento</span>
                    <span className="text-[#1B8EF2]">S/.{selectedSale.descuento.toFixed(2)}</span>
                  </div>
                  <hr className="border-[#9ba0ad] border-1" />
                  <div className="flex justify-between font-bold pt-1">
                    <span className="text-[#0F172A]">TOTAL</span>
                    <span className="text-[#0F172A]">S/{selectedSale.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* Modal Productos para devolver */}
        <Modal isOpen={showReturn} onClose={() => setShowReturn(false)} title="Productos para devolver" width="max-w-lg">
          {selectedSale && (
            <>
              <p className="text-sm font-semibold text-[#0F172A] mb-3">Productos Vendidos</p>
              <table className="w-full mb-4">
                <thead className="bg-[#1B8EF2]">
                  <tr>
                    <th className="px-3 py-2 w-10"></th>
                    <th className="px-3 py-2 text-xs font-medium text-white text-center">Modelo</th>
                    <th className="px-3 py-2 text-xs font-medium text-white text-center">Cantidad</th>
                    <th className="px-3 py-2 text-xs font-medium text-white text-center">Color</th>
                    <th className="px-3 py-2 text-xs font-medium text-white text-center">Talla</th>
                    <th className="px-3 py-2 text-xs font-medium text-white text-center">Subtotal (S/.)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSale.productos.map((p, i) => (
                    <tr key={i} className="border-b border-[#E4E7EE]">
                      <td className="px-3 py-3 text-center">
                        <Checkbox checked={selectedItems.includes(i)} onChange={() => toggleItem(i)} />
                      </td>
                      <td className="px-3 py-3 text-xs text-center text-[#0F172A]">{p.modelo}</td>
                      <td className="px-3 py-3 text-xs text-center text-[#0F172A]">{p.cantidad}</td>
                      <td className="px-3 py-3 text-xs text-center text-[#0F172A]">{p.color}</td>
                      <td className="px-3 py-3 text-xs text-center text-[#0F172A]">{p.talla}</td>
                      <td className="px-3 py-3 text-xs text-center text-[#0F172A]">{p.subtotal.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-center">
                <button 
                  onClick={handleConfirmarDevolucion}
                  disabled={selectedItems.length === 0}
                  className={`px-5 py-2 border border-[#F29F1B] text-[#F29F1B] rounded-full text-sm transition-all inline-flex items-center gap-2
                    ${selectedItems.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-50'}`}
                >
                  Devolver <Trash2 size={16} />
                </button>
              </div>
            </>
          )}
        </Modal>

        {/* Modal Detalle de Producto */}
        <Modal isOpen={showProduct} onClose={() => setShowProduct(false)} title="Detalle de Producto" width="max-w-xl">
          {selectedProduct && (
            <>
              <div className="flex gap-8">
                <div className="flex-1 space-y-4">
                  <Input label="Modelo" value={selectedProduct.modelo} disabled />
                  <Input label="Cantidad" value={String(selectedProduct.cantidad)} disabled />
                  <Input label="Color" value={selectedProduct.color} disabled />
                  <Input label="Talla" value={selectedProduct.talla} disabled />
                  <Input label="Precio Unitario" value={`S/. ${selectedProduct.precioUnitario?.toFixed(2) || '0.00'}`} disabled />
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-44 h-44 rounded-full overflow-hidden bg-gradient-to-b from-[#87CEEB] to-[#5BA3D9] flex items-center justify-center">
                    <div className="text-6xl">👟</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-8 justify-center">
                <button 
                  onClick={() => setShowProduct(false)}
                  className="px-8 py-2.5 border-2 border-[#1B8EF2] text-[#1B8EF2] rounded-full text-sm font-medium hover:bg-blue-50 transition-all"
                >
                  Cerrar
                </button>
              </div>
            </>
          )}
        </Modal>

        {/* Modal Success */}
        <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
      </div>
    </div>
  );
}