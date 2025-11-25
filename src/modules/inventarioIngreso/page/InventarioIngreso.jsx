import { useState, useMemo, useEffect } from 'react';
import {
  Phone,
  Package,
  Droplet,
  Box,
  DollarSign,
  Calendar,
  User,
  Tag
} from 'lucide-react';

import { useSearchParams } from "react-router-dom";

import { Select } from '../components/atoms/Select';
import { Modal } from "../../ventasDashboard/components/organisms/Modal";
import { InfoRow } from "../../ventasDashboard/components/molecules/InfoRow";
import { Button } from '../../../globals/components/atomos/Button';
import { useInventario } from '../../../context/InventarioContext';

import InventarioTableCard from '../components/organismos/InventarioTableCard';
import { InventoryCardHeader } from '../components/molecules/InventoryCardHeader';
import { ActiveFiltersChips } from '../components/molecules/ActiveFiltersChips';
import { SortableTableHeader } from '../components/molecules/SortableTableHeader';

import { MdFilterAltOff } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FaInfoCircle } from "react-icons/fa";
import { HiPlus, HiOutlineTrash } from "react-icons/hi2";



export default function InventarioIngreso() {
  // Datos del contexto
  const { productos, ingresos } = useInventario();

  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showIngresoDetail, setShowIngresoDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedIngreso, setSelectedIngreso] = useState(null);

  const [searchParams] = useSearchParams();
  const ingresoIdParam = searchParams.get('ingresoId');

  useEffect(() => {
    if (ingresoIdParam && ingresos.length > 0) {
      const ingreso = ingresos.find(ing => String(ing.id) === String(ingresoIdParam));
      if (ingreso) {
        setSelectedIngreso(ingreso);
        setShowIngresoDetail(true);
      }
    }
  }, [ingresoIdParam, ingresos]);


  const [filters, setFilters] = useState({
    modelo: '',
    color: '',
    talla: '',
    sucursal: ''
  });

  const [filtersIngreso, setFiltersIngreso] = useState({
    proveedor: '',
    fecha: '',
    sucursal: '',
    tipo: ''
  });

  // Estado para ordenamiento de ingresos
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  // ==========================
  // Filtros productos
  // ==========================
  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      const matchModelo =
        !filters.modelo ||
        p.producto.toLowerCase().includes(filters.modelo.toLowerCase());
      const matchColor =
        !filters.color ||
        p.color.toLowerCase() === filters.color.toLowerCase();
      const matchTalla = !filters.talla || p.talla === filters.talla;
      return matchModelo && matchColor && matchTalla;
    });
  }, [filters, productos]);

  // ==========================
  // Filtros ingresos
  // ==========================
  const ingresosFiltrados = useMemo(() => {
    return ingresos.filter((ing) => {
      const matchProveedor =
        !filtersIngreso.proveedor ||
        ing.proveedor
          .toLowerCase()
          .includes(filtersIngreso.proveedor.toLowerCase());
      const matchTipo =
        !filtersIngreso.tipo || ing.tipo === filtersIngreso.tipo;
      const matchSucursal =
        !filtersIngreso.sucursal ||
        ing.sucursal === filtersIngreso.sucursal;

      let matchFecha = true;
      if (filtersIngreso.fecha) {
        const hoy = new Date();
        const fechaIngreso = new Date(ing.fecha);
        if (filtersIngreso.fecha === 'hoy') {
          matchFecha = fechaIngreso.toDateString() === hoy.toDateString();
        } else if (filtersIngreso.fecha === 'semana') {
          const unaSemanaAtras = new Date(
            hoy.getTime() - 7 * 24 * 60 * 60 * 1000
          );
          matchFecha = fechaIngreso >= unaSemanaAtras;
        }
      }

      return matchProveedor && matchTipo && matchSucursal && matchFecha;
    });
  }, [filtersIngreso, ingresos]);

  // Ordenar ingresos filtrados
  const ingresosOrdenados = useMemo(() => {
    if (!sortColumn) return ingresosFiltrados;

    return [...ingresosFiltrados].sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];

      // Manejo especial para cantidad (numérico)
      if (sortColumn === 'cantidad') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      } else {
        aValue = String(aValue || '').toLowerCase();
        bValue = String(bValue || '').toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [ingresosFiltrados, sortColumn, sortDirection]);

  // Manejar ordenamiento
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // ==========================
  // Handlers
  // ==========================
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
    setFiltersIngreso({
      proveedor: '',
      fecha: '',
      sucursal: '',
      tipo: ''
    });
  };

  // Remover un filtro específico de ingresos
  const handleRemoveFilterIngreso = (filterKey) => {
    setFiltersIngreso(prev => ({
      ...prev,
      [filterKey]: ''
    }));
  };

  // Labels para filtros de ingresos
  const ingresoFilterLabels = {
    proveedor: 'Proveedor',
    fecha: 'Fecha',
    sucursal: 'Sucursal',
    tipo: 'Tipo de Ingreso'
  };

  // Labels para valores de filtros de ingresos
  const ingresoValueLabels = {
    proveedor: {
      'adidas': 'Adidas Perú',
      'nike': 'Nike Perú',
      'latam': 'Adidas Latam'
    },
    fecha: {
      'hoy': 'Hoy',
      'semana': 'Esta semana'
    },
    sucursal: {
      'lima': 'Lima Centro'
    },
    tipo: {
      'compra': 'Compra',
      'devolucion': 'Devolución'
    }
  };

  // ==========================
  // Headers para las tablas
  // ==========================
  const productosHeaders = ['SKU', 'Producto', 'Color', 'Talla', 'Detalle'];
  const ingresosHeaders = [
    'ID Ingreso',
    'Proveedor',
    'Producto',
    'Cantidad',
    'Detalle'
  ];

  // ==========================
  // JSX
  // ==========================
  return (
    <main className="flex-grow p-6 bg-neutral-03">
      {/* Header principal */}
      <h1 className="text-l font-bold text-text-01 bg-neutral-01 rounded-4xl shadow-md p-2 px-4 flex flex-col mb-4">
        Inventario / Ingresos
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-1 gap-4">
        
        <div className="space-y-4">
          {/* BUSCAR INGRESO */}
          <div className="bg-primary-01 rounded-2xl p-6 shadow-md">
            
            <InventoryCardHeader title={"Buscar Ingreso"} color="white" />
            <p className="text-xl text-blue-100 mb-5">
              Filtra ingresos por proveedor, fecha, sucursal y tipo
            </p>

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-4
              gap-8">
              <Select
                title='Proveedor'
                placeholder="Proveedor"
                options={[
                  { value: 'adidas', label: 'Adidas Perú' },
                  { value: 'nike', label: 'Nike Perú' },
                  { value: 'latam', label: 'Adidas Latam' }
                ]}
                value={filtersIngreso.proveedor}
                onChange={(e) => setFiltersIngreso({ ...filtersIngreso, proveedor: e.target.value })}
              />
              <Select
                title='Fecha'
                placeholder="Fecha"
                options={[
                  { value: 'hoy', label: 'Hoy' },
                  { value: 'semana', label: 'Esta semana' }
                ]}
                value={filtersIngreso.fecha}
                onChange={(e) => setFiltersIngreso({ ...filtersIngreso, fecha: e.target.value })}
              />
              <Select
                title='Sucursal'
                placeholder="Sucursal"
                options={[{ value: 'lima', label: 'Lima Centro' }]}
                value={filtersIngreso.sucursal}
                onChange={(e) => setFiltersIngreso({ ...filtersIngreso, sucursal: e.target.value })}
              />
              <Select
                title='Tipo de ingreso'
                placeholder="Tipo de ingreso"
                options={[
                  { value: 'compra', label: 'Compra' },
                  { value: 'devolucion', label: 'Devolución' }
                ]}
                value={filtersIngreso.tipo}
                onChange={(e) => setFiltersIngreso({ ...filtersIngreso, tipo: e.target.value })}
              />
            </div>

            <div className="flex flex-wrap justify-end gap-3 mt-8">
              <Button
                size="medium"
                variant="white"
                className="-mt-2 flex items-center gap-2"
                onClick={limpiarFiltrosIngresos}
                icon={<MdFilterAltOff className="w-4 h-4" />}
                iconPosition="right"
              >
                Limpiar filtros
              </Button>
              <Button
                size="medium"
                variant="white"
                className="-mt-2 flex items-center gap-2"
                icon={<FaSearch className="w-4 h-4" />}
                iconPosition="right"
              >
                Buscar
              </Button>
            </div>
          </div>

          {/* LISTA DE INGRESOS */}
          <div className="bg-neutral-01 rounded-3xl shadow-md border border-neutral-02 p-4">
            {/* Header con título y botón */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <InventoryCardHeader title="Lista de ingresos" />
                <p className="text-sm text-gray-600 mt-1">
                  Resultados según filtros aplicados · {ingresosOrdenados.length} resultado{ingresosOrdenados.length !== 1 ? 's' : ''}
                </p>

                {/* Chips de filtros activos */}
                <ActiveFiltersChips
                  filters={filtersIngreso}
                  onRemoveFilter={handleRemoveFilterIngreso}
                  filterLabels={ingresoFilterLabels}
                  valueLabels={ingresoValueLabels}
                />
              </div>

              <Button
                size="medium"
                variant="secondaryUNO"
                className="flex items-center gap-2 whitespace-nowrap ml-4"
                onClick={() => window.location.href = "/inventario/registrarIngreso"}
                icon={<HiPlus className="w-6 h-6" />}
                iconPosition="left"
              >
                Registrar ingreso
              </Button>
            </div>

            {/* Tabla con scroll */}
            <div className="max-h-[600px] overflow-y-auto rounded-2xl">
              <table className="w-full">
                <thead className="bg-[#1B8EF2] sticky top-0 z-10">
                  <tr>
                    <SortableTableHeader
                      column="id"
                      label="ID Ingreso"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={handleSort}
                      className="px-3"
                    />
                    <SortableTableHeader
                      column="proveedor"
                      label="Proveedor"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={handleSort}
                      className="px-3"
                    />
                    <SortableTableHeader
                      column="producto"
                      label="Producto"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={handleSort}
                      className="px-3"
                    />
                    <SortableTableHeader
                      column="cantidad"
                      label="Cantidad"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={handleSort}
                      className="px-3"
                    />
                    <SortableTableHeader
                      column=""
                      label="Detalle"
                      sortable={false}
                      className="px-3"
                    />
                  </tr>
                </thead>

                <tbody>
                  {ingresosOrdenados.length > 0 ? (
                    ingresosOrdenados.map((ing, index) => (
                      <tr
                        key={index}
                        className="border-b border-[#E4E7EE] hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-3 py-3 text-sm text-center text-[#0F172A]">
                          {ing.id}
                        </td>
                        <td className="px-3 py-3 text-sm text-center text-[#0F172A]">
                          {ing.proveedor}
                        </td>
                        <td className="px-3 py-3 text-sm text-center text-[#0F172A]">
                          {ing.producto}
                        </td>
                        <td className="px-3 py-3 text-sm text-center text-[#0F172A]">
                          {ing.cantidad}
                        </td>
                        <td className="px-3 py-3 text-center">
                          <Button 
                            size="small" 
                            variant="white" 
                            icon={<FaInfoCircle className="w-5 h-5"/>} 
                            iconPosition='right' 
                            onClick={() => handleVerDetalleIngreso(ing)} 
                          >
                            Ver detalle
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={ingresosHeaders.length}
                        className="px-4 py-8 text-sm text-center text-gray-500"
                      >
                        No se encontraron ingresos con los filtros seleccionados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Detalle de Producto */}
      <Modal
        isOpen={showProductDetail}
        onClose={() => setShowProductDetail(false)}
        title="Detalle de Producto"
      >
        {selectedProduct && (
          <div className="space-y-5">
            {/* Datos del producto */}
            <div>
              <p className="text-sm font-semibold text-text-01 mb-3 border-b border-neutral-02 pb-1">
                Datos del producto
              </p>
              <div className="space-y-3">
                <InfoRow
                  icon={Tag}
                  label="ID del Producto"
                  value={selectedProduct.sku}
                />
                <InfoRow
                  icon={Package}
                  label="Modelo"
                  value={selectedProduct.producto}
                />
                <InfoRow
                  icon={Droplet}
                  label="Color"
                  value={selectedProduct.color}
                  iconBg="bg-text-01"
                />
                <InfoRow
                  icon={Box}
                  label="Stock disponible"
                  value={selectedProduct.stock}
                />
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-primary-01 flex items-center justify-center flex-shrink-0">
                    <span className="text-text-03 text-xs font-bold">
                      {selectedProduct.talla}
                    </span>
                  </div>
                  <div className="leading-tight">
                    <p className="text-xs text-neutral-03">Talla</p>
                    <p className="text-sm text-text-01 font-medium">
                      {selectedProduct.talla}
                    </p>
                  </div>
                </div>
                <InfoRow
                  icon={DollarSign}
                  label="Costo unitario"
                  value={selectedProduct.costo}
                />
                <InfoRow
                  icon={Calendar}
                  label="Último ingreso"
                  value={selectedProduct.ultimoIngreso}
                />
              </div>
            </div>

            {/* Datos del proveedor */}
            <div>
              <p className="text-sm font-semibold text-text-01 mb-3 border-b border-neutral-02 pb-1">
                Datos del proveedor
              </p>
              <div className="space-y-3">
                <InfoRow
                  icon={User}
                  label="Proveedor"
                  value={selectedProduct.proveedor}
                />
                <InfoRow
                  icon={DollarSign}
                  label="Costo unitario"
                  value={selectedProduct.costoProveedor}
                />
                <InfoRow
                  icon={Phone}
                  label="Teléfono"
                  value={selectedProduct.telefono}
                />
              </div>
            </div>

            {/* Ingresos relacionados */}
            <div>
              <p className="text-sm font-semibold text-text-01 mb-3 border-b border-neutral-02 pb-1">
                Ingresos relacionados
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-neutral-02/60">
                    <tr>
                      <th className="px-2 py-2 font-semibold text-text-01 text-center">
                        ID Ingreso
                      </th>
                      <th className="px-2 py-2 font-semibold text-text-01 text-center">
                        Cantidad
                      </th>
                      <th className="px-2 py-2 font-semibold text-text-01 text-center">
                        Costo total (S/.)
                      </th>
                      <th className="px-2 py-2 font-semibold text-text-01 text-center">
                        Detalle
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProduct.ingresosRelacionados.map((ing, i) => (
                      <tr
                        key={i}
                        className="border-b border-neutral-02 last:border-0"
                      >
                        <td className="px-2 py-2 text-center text-text-01">
                          {ing.id}
                        </td>
                        <td className="px-2 py-2 text-center text-text-01">
                          {ing.cantidad}
                        </td>
                        <td className="px-2 py-2 text-center text-text-01">
                          {ing.costo}
                        </td>
                        <td className="px-2 py-2 text-center">
                          <button className="inline-flex items-center justify-center px-3 py-1 text-[11px] font-semibold rounded-full border border-primary-01 text-primary-01 hover:bg-primary-01 hover:text-text-03 transition-colors">
                            Ver detalle
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Resumen del producto */}
            <div>
              <p className="text-sm font-semibold text-primary-01 mb-2 border-b border-neutral-02 pb-1">
                Resumen del producto
              </p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-01">Stock actual</span>
                  <span className="text-text-01">
                    {selectedProduct.stockActual}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-01">Último costo</span>
                  <span className="text-text-01">
                    {selectedProduct.ultimoCosto}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Detalle de Ingreso */}
      <Modal
        isOpen={showIngresoDetail}
        onClose={() => setShowIngresoDetail(false)}
        title="Detalle de Ingreso"
        width='max-w-xl'
      >
        {selectedIngreso && (
          <div className="space-y-5">
            <div>
              <p className="text-sm font-semibold text-text-01 mb-3 border-b border-neutral-02 pb-1">
                Información del ingreso
              </p>
              <div className="space-y-3">
                <InfoRow
                  icon={Tag}
                  label="ID Ingreso"
                  value={selectedIngreso.id}
                />
                <InfoRow
                  icon={User}
                  label="Proveedor"
                  value={selectedIngreso.proveedor}
                />
                <InfoRow
                  icon={Package}
                  label="Producto"
                  value={selectedIngreso.producto}
                />
                <InfoRow
                  icon={Box}
                  label="Cantidad"
                  value={`${selectedIngreso.cantidad} unidades`}
                />
                <InfoRow
                  icon={Calendar}
                  label="Fecha"
                  value={selectedIngreso.fecha}
                />
                <InfoRow
                  icon={Tag}
                  label="Tipo"
                  value={
                    selectedIngreso.tipo === 'compra' ? 'Compra' : 'Devolución'
                  }
                />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}