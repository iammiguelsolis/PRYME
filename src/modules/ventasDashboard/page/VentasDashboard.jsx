import { useState } from 'react';
import { SectionTitle } from '../components/molecules/SectionTitle';
import { Input } from '../components/atoms/Input';
import { Select } from '../components/atoms/Select';
import { StatCard } from '../components/molecules/StatCard';
import { Modal } from '../components/organisms/Modal';
import { InfoRow } from '../components/molecules/InfoRow';
import { Checkbox } from '../components/atoms/Checkbox';
import { SuccessModal } from '../components/organisms/SuccessModal';
import { Plus, Trash2, MessageSquare, Phone, User, CreditCard, MapPin, Edit3, Hash, Banknote, TrendingUp  } from 'lucide-react';
import { HiOutlineTrash  } from 'react-icons/hi2';
import { DashboardCardHeader } from '../../inicio/components/moleculas/DashboardCardHeader';
import { Button } from '../../../globals/components/atomos/Button';
import { useNavigate } from "react-router-dom";

export default function VentasDashboard() {
  const [filters, setFilters] = useState({ id: '', nombre: '', doc: '', canal: 'tiktok', sucursal: 'nofisico', metodo: 'yape' });
  const [showDetail, setShowDetail] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const sale = {
    id: 26374,
    cliente: 'Juan',
    clienteFull: 'María González Pérez',
    doc: '77777777',
    dni: '73456789',
    telefono: '+51 987 654 321',
    canal: 'Tik Tok',
    sucursal: 'Lima Centro',
    metodo: 'Yape',
    vendedor: 'Juan Pérez',
    total: '559.99',
    subtotal: 580,
    descuento: 120,
    totalFinal: 460,
    productos: [{ modelo: 'Nike Dunk SB', cantidad: 1, color: 'Verde', talla: '42', subtotal: 559.99 }]
  };

  const toggleItem = (i) => setSelectedItems(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

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
              <Input label="ID Venta" placeholder="ID Venta" value={filters.id} onChange={e => setFilters({...filters, id: e.target.value})} />
              <Input label="Nombre Cliente" placeholder="Nombre Cliente" value={filters.nombre} onChange={e => setFilters({...filters, nombre: e.target.value})} />
              <Input label="Doc. Identidad" placeholder="DNI / RUC" value={filters.doc} onChange={e => setFilters({...filters, doc: e.target.value})} />
              <Select 
                label="Canal" 
                options={[{value:'tiktok',label:'Tik Tok'},{value:'instagram',label:'Instagram'}]} 
                value={filters.canal} 
                onChange={e => setFilters({...filters, canal: e.target.value})} 
              />
              <Select 
                label="Sucursal" 
                options={[{value:'nofisico',label:'No físico'},{value:'lima',label:'Lima Centro'}]} 
                value={filters.sucursal} 
                onChange={e => setFilters({...filters, sucursal: e.target.value})}
                disabled
              />
              <Select 
                label="Metodo de Pago" 
                options={[{value:'yape',label:'Yape'},{value:'plin',label:'Plin'}]} 
                value={filters.metodo} 
                onChange={e => setFilters({...filters, metodo: e.target.value})} 
              />
            </div>
          </div>
          <StatCard icon={Banknote} title="Ventas del día" value="S/. 5,420" />
          <StatCard icon={TrendingUp} title="Ventas del día" value="S/. 5,420" />
        </div>

        {/* Lista de Ventas */}
        <div className="bg-white rounded-xl border border-[#E4E7EE] shadow-sm overflow-hidden">
          <div className="p-5 flex items-center justify-between">
            <div className='w-full pr-6'>
              <DashboardCardHeader title="Lista de Ventas"/>
            </div>
            <Button
              size="medium"
              variant="secondaryUNO"
              className="-mt-4 flex items-center gap-2"
              onClick={() => navigate("/ventas/registrar")}
            >
              Registrar Venta <Plus size={18} />
            </Button>
          </div>
          
          <table className="w-full">
            <thead className="bg-[#1B8EF2]">
              <tr>
                <th className="px-4 py-3 text-xs font-medium text-white text-center">ID Venta</th>
                <th className="px-4 py-3 text-xs font-medium text-white text-center">Nombre Cliente</th>
                <th className="px-4 py-3 text-xs font-medium text-white text-center">Doc Identidad</th>
                <th className="px-4 py-3 text-xs font-medium text-white text-center">Canal</th>
                <th className="px-4 py-3 text-xs font-medium text-white text-center">Metodo de Pago</th>
                <th className="px-4 py-3 text-xs font-medium text-white text-center">Total (S/.)</th>
                <th className="px-4 py-3 text-xs font-medium text-white text-center">Detalle</th>
                <th className="px-4 py-3 text-xs font-medium text-white text-center">Accion</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#E4E7EE]">
                <td className="px-4 py-4 text-sm text-center text-[#0F172A]">{sale.id}</td>
                <td className="px-4 py-4 text-sm text-center text-[#0F172A]">{sale.cliente}</td>
                <td className="px-4 py-4 text-sm text-center text-[#0F172A]">{sale.doc}</td>
                <td className="px-4 py-4 text-sm text-center text-[#0F172A]">{sale.canal}</td>
                <td className="px-4 py-4 text-sm text-center text-[#0F172A]">{sale.metodo}</td>
                <td className="px-4 py-4 text-sm text-center text-[#0F172A]">{sale.total}</td>
                <td className="px-4 py-4 text-center">
                  <Button size="small" variant="white" onClick={() => setShowDetail(true)}>
                    Ver Detalle
                  </Button>
                </td>
                <td className="px-4 py-4 text-center">
                  <Button size="small" variant="whiteRed" onClick={() => setShowReturn(true)}>
                    Devolución
                    <HiOutlineTrash className="w-5 h-5" />
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal Detalle de Venta */}
        <Modal isOpen={showDetail} onClose={() => setShowDetail(false)} title="Detalle de Venta" width="max-w-xl">
          <div className="space-y-5">
            <div>
              <p className="text-xl font-semibold text-[#0F172A]">Datos de la venta</p>
              <hr className="border-text-02 border-1 mb-3" />
              <div className="space-y-3">
                <InfoRow icon={Edit3} label="ID de la Venta" value={sale.id} />
                <InfoRow icon={Hash} label="Canal" value={sale.canal} />
                <InfoRow icon={MapPin} label="Sucursal" value={sale.sucursal} />
                <InfoRow icon={CreditCard} label="Método de pago" value={sale.metodo} />
                <InfoRow icon={User} label="Vendedor" value={sale.vendedor} />
              </div>
            </div>
            
            <div>
              <p className="text-xl font-semibold text-[#0F172A]">Datos del Cliente</p>
              <hr className="border-text-02 border-1 mb-3" />
              <div className="space-y-3">
                <InfoRow icon={User} label="Nombre completo" value={sale.clienteFull} />
                <InfoRow icon={CreditCard} label="DNI" value={sale.dni} />
                <InfoRow icon={Phone} label="Teléfono" value={sale.telefono} />
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
                  <tr className="border-b border-[#E4E7EE]">
                    <td className="px-2 py-2 text-xs text-center text-[#0F172A]">Nike Dunk SB</td>
                    <td className="px-2 py-2 text-xs text-center text-[#0F172A]">1</td>
                    <td className="px-2 py-2 text-xs text-center text-[#0F172A]">559.99</td>
                    <td className="px-2 py-2 text-center">
                      <button 
                        onClick={() => { setShowDetail(false); setShowProduct(true); }}
                        className="px-3 py-1 bg-[#1B8EF2] text-white rounded-full text-xs hover:bg-[#1675F2] transition-all"
                      >
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#0F172A]">Resumen</p>
              <hr className="border-text-02 border-1 mb-3" />
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#0F172A]">Subtotal</span>
                  <span className="text-[#0F172A]">S/.{sale.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1B8EF2]">Descuento</span>
                  <span className="text-[#1B8EF2]">S/.{sale.descuento}</span>
                </div>
                <hr className="border-[#9ba0ad] border-1" />
                <div className="flex justify-between font-bold pt-1">
                  <span className="text-[#0F172A]">TOTAL</span>
                  <span className="text-[#0F172A]">S/{sale.totalFinal}</span>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        {/* Modal Productos para devolver */}
        <Modal isOpen={showReturn} onClose={() => setShowReturn(false)} title="Productos para devolver" width="max-w-lg">
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
              {sale.productos.map((p, i) => (
                <tr key={i} className="border-b border-[#E4E7EE]">
                  <td className="px-3 py-3 text-center">
                    <Checkbox checked={selectedItems.includes(i)} onChange={() => toggleItem(i)} />
                  </td>
                  <td className="px-3 py-3 text-xs text-center text-[#0F172A]">{p.modelo}</td>
                  <td className="px-3 py-3 text-xs text-center text-[#0F172A]">{p.cantidad}</td>
                  <td className="px-3 py-3 text-xs text-center text-[#0F172A]">{p.color}</td>
                  <td className="px-3 py-3 text-xs text-center text-[#0F172A]">{p.talla}</td>
                  <td className="px-3 py-3 text-xs text-center text-[#0F172A]">{p.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center">
            <button 
              onClick={() => { setShowReturn(false); setShowSuccess(true); }}
              className="px-5 py-2 border border-[#F29F1B] text-[#F29F1B] rounded-full text-sm hover:bg-orange-50 transition-all inline-flex items-center gap-2"
            >
              Devolver <Trash2 size={16} />
            </button>
          </div>
        </Modal>

        {/* Modal Detalle de Producto */}
        <Modal isOpen={showProduct} onClose={() => setShowProduct(false)} title="Detalle de Producto" width="max-w-xl">
          <div className="flex gap-8">
            <div className="flex-1 space-y-4">
              <Input label="Modelo" value="Nike Dunk SB" disabled />
              <Input label="Cantidad" value="1" disabled />
              <Input label="Color" value="Rojo" disabled />
              <Input label="Talla" value="42" disabled />
              <Input label="Sucursal Origen" value="Lima Centro" disabled />
            </div>
            <div className="flex items-center justify-center">
              <div className="w-44 h-44 rounded-full overflow-hidden bg-gradient-to-b from-[#87CEEB] to-[#5BA3D9] flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop&crop=face" 
                  alt="Avatar"
                  className="w-32 h-32 object-cover rounded-full"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="text-6xl">👤</div>';
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-8 justify-center">
            <button className="px-6 py-2.5 bg-[#F29F1B] text-white rounded-full text-sm font-medium hover:bg-[#E08F0B] transition-all">
              Registrar Devolución
            </button>
            <button 
              onClick={() => setShowProduct(false)}
              className="px-8 py-2.5 border-2 border-[#1B8EF2] text-[#1B8EF2] rounded-full text-sm font-medium hover:bg-blue-50 transition-all"
            >
              Cerrar
            </button>
          </div>
        </Modal>

        {/* Modal Success */}
        <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
      </div>
    </div>
  );
}