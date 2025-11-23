import { useState } from 'react';
import {Phone, Package, Droplet, Box, DollarSign, Calendar, User, Tag} from 'lucide-react';
import { Select } from '../components/atoms/Select';
import { Modal } from '../components/molecules/Modal';
import { InfoRow } from '../components/atoms/InfoRow';
import { Button } from '../../../globals/components/atomos/Button';

export default function InventarioDashboard() {
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [filters, setFilters] = useState({ modelo: '', color: '', talla: '', sucursal: '' });
  const [filtersIngreso, setFiltersIngreso] = useState({ proveedor: '', fecha: '', sucursal: '', tipo: '' });

  const productos = [
    { sku: '50012', producto: 'Nike Air Force', color: 'Verde', talla: '42' },
    { sku: '44001', producto: 'Adidas Samba', color: 'Blanco', talla: '40' },
    { sku: '50315', producto: 'NB 560 Grey', color: 'Gris', talla: '41' },
    { sku: '48934', producto: 'Adidas Gazelle', color: 'Negro', talla: '39' },
  ];

  const ingresos = [
    { id: '23214', proveedor: 'Adidas Peru', producto: 'Air Max', cantidad: 16 },
    { id: '23215', proveedor: 'Adidas Latam', producto: 'Ultraboost', cantidad: 30 },
    { id: '23208', proveedor: 'Nike Peru', producto: 'Dunk SB', cantidad: 25 },
    { id: '23199', proveedor: 'Adidas Peru', producto: 'Campus', cantidad: 25 },
  ];

  const productoDetalle = {
    id: '50001',
    modelo: 'Nike Dunk SB',
    color: 'Negro',
    stock: '20 unidades',
    talla: '41',
    costo: 'S/. 180.00',
    ultimoIngreso: '15 - 11- 2025',
    proveedor: 'Nike Peru',
    costoProveedor: 'S/. 180.00',
    telefono: '+51 987 321 654',
    ingresosRelacionados: [{ id: '23214', cantidad: 10, costo: '1,800.00' }],
    stockActual: '10 unidades',
    ultimoCosto: 'S/.180.00'
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
                <Select placeholder="Modelo" options={[{value:'nike',label:'Nike'},{value:'adidas',label:'Adidas'}]} value={filters.modelo} onChange={e => setFilters({...filters, modelo: e.target.value})} />
                <Select placeholder="Color" options={[{value:'verde',label:'Verde'},{value:'negro',label:'Negro'}]} value={filters.color} onChange={e => setFilters({...filters, color: e.target.value})} />
                <Select placeholder="Talla" options={[{value:'40',label:'40'},{value:'41',label:'41'},{value:'42',label:'42'}]} value={filters.talla} onChange={e => setFilters({...filters, talla: e.target.value})} />
                <Select placeholder="Sucursal" options={[{value:'lima',label:'Lima Centro'}]} value={filters.sucursal} onChange={e => setFilters({...filters, sucursal: e.target.value})} />
              </div>
              <div className="flex gap-3 mt-5 justify-center mt-8">
                <Button
                size="medium"
                variant="white"
                className="-mt-4 flex items-center gap-2"
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
              <h2 className="text-xl font-bold text-[#0F172A] text-center mb-4">LISTA DE PRODUCTOS</h2>
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
                  {productos.map((p, i) => (
                    <tr key={i} className="border-b border-[#E4E7EE]">
                      <td className="px-3 py-3 text-sm text-center text-[#0F172A]">{p.sku}</td>
                      <td className="px-3 py-3 text-sm text-center text-[#0F172A]">{p.producto}</td>
                      <td className="px-3 py-3 text-sm text-center text-[#0F172A]">{p.color}</td>
                      <td className="px-3 py-3 text-sm text-center text-[#0F172A]">{p.talla}</td>
                      <td className="px-3 py-3 text-center">
                        <button onClick={() => setShowProductDetail(true)} className="text-[#2FAE90] text-sm font-medium hover:underline">
                          Ver Detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* BUSCAR INGRESO */}
            <div className="bg-gradient-to-b from-[#1B8EF2] to-[#1675F2] rounded-2xl p-6">
              <h2 className="text-white text-xl font-bold text-center mb-5">BUSCAR INGRESO</h2>
              <div className="space-y-3 max-w-md mx-auto">
                <Select placeholder="Proveedor" options={[{value:'adidas',label:'Adidas Peru'},{value:'nike',label:'Nike Peru'}]} value={filtersIngreso.proveedor} onChange={e => setFiltersIngreso({...filtersIngreso, proveedor: e.target.value})} />
                <Select placeholder="Fecha" options={[{value:'hoy',label:'Hoy'},{value:'semana',label:'Esta semana'}]} value={filtersIngreso.fecha} onChange={e => setFiltersIngreso({...filtersIngreso, fecha: e.target.value})} />
                <Select placeholder="Sucursal" options={[{value:'lima',label:'Lima Centro'}]} value={filtersIngreso.sucursal} onChange={e => setFiltersIngreso({...filtersIngreso, sucursal: e.target.value})} />
                <Select placeholder="Tipo de Ingreso" options={[{value:'compra',label:'Compra'},{value:'devolucion',label:'Devolución'}]} value={filtersIngreso.tipo} onChange={e => setFiltersIngreso({...filtersIngreso, tipo: e.target.value})} />
              </div>
              <div className="flex gap-3 mt-5 justify-center mt-8">
                <Button
                size="medium"
                variant="white"
                className="-mt-4 flex items-center gap-2"
                >
                  Registrar Ingreso
                </Button>
                <Button
                size="medium"
                variant="white"
                className="-mt-4 flex items-center gap-2"
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
              <h2 className="text-xl font-bold text-[#0F172A] text-center mb-4">LISTA DE INGRESOS</h2>
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
                  {ingresos.map((ing, i) => (
                    <tr key={i} className="border-b border-[#E4E7EE]">
                      <td className="px-3 py-3 text-sm text-center text-[#0F172A]">{ing.id}</td>
                      <td className="px-3 py-3 text-sm text-center text-[#0F172A]">{ing.proveedor}</td>
                      <td className="px-3 py-3 text-sm text-center text-[#0F172A]">{ing.producto}</td>
                      <td className="px-3 py-3 text-sm text-center text-[#0F172A]">{ing.cantidad}</td>
                      <td className="px-3 py-3 text-center">
                        <button className="text-[#2FAE90] text-sm font-medium hover:underline">
                          Ver Detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Detalle de Producto */}
        <Modal isOpen={showProductDetail} onClose={() => setShowProductDetail(false)} title="Detalle de Producto">
          <div className="space-y-5">
            {/* Datos del producto */}
            <div>
              <p className="text-sm font-semibold text-[#0F172A] mb-3 border-b border-[#E4E7EE] pb-1">Datos del producto</p>
              <div className="space-y-3">
                <InfoRow icon={Tag} label="ID del Producto" value={productoDetalle.id} />
                <InfoRow icon={Package} label="Modelo" value={productoDetalle.modelo} />
                <InfoRow icon={Droplet} label="Color" value={productoDetalle.color} iconBg="bg-[#0F172A]" />
                <InfoRow icon={Box} label="Stock Disponible" value={productoDetalle.stock} />
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#1B8EF2] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">XL</span>
                  </div>
                  <div className="leading-tight">
                    <p className="text-xs text-[#BEC2C9]">Talla</p>
                    <p className="text-sm text-[#0F172A] font-medium">{productoDetalle.talla}</p>
                  </div>
                </div>
                <InfoRow icon={DollarSign} label="Costo Unitario" value={productoDetalle.costo} />
                <InfoRow icon={Calendar} label="Ultimo Ingreso" value={productoDetalle.ultimoIngreso} />
              </div>
            </div>

            {/* Datos del Proveedor */}
            <div>
              <p className="text-sm font-semibold text-[#0F172A] mb-3 border-b border-[#E4E7EE] pb-1">Datos del Proveedor</p>
              <div className="space-y-3">
                <InfoRow icon={User} label="Proveedor" value={productoDetalle.proveedor} />
                <InfoRow icon={DollarSign} label="Costo Unitario" value={productoDetalle.costoProveedor} />
                <InfoRow icon={Phone} label="Teléfono" value={productoDetalle.telefono} />
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
                  {productoDetalle.ingresosRelacionados.map((ing, i) => (
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
                  <span className="text-[#0F172A]">{productoDetalle.stockActual}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#0F172A]">Ultimo Costo</span>
                  <span className="text-[#0F172A]">{productoDetalle.ultimoCosto}</span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}