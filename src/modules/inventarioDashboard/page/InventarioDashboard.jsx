import { useState, useMemo } from 'react';
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

import { Link } from "react-router-dom";
import { Select } from '../components/atoms/Select';
import { Modal } from '../../ventasDashboard/components/organisms/Modal';
import { InfoRow } from '../../ventasDashboard/components/molecules/InfoRow';
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


export default function InventarioDashboard() {
  // Datos del contexto
  const { productos, ingresos } = useInventario();

  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showIngresoDetail, setShowIngresoDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedIngreso, setSelectedIngreso] = useState(null);

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

  // Estado para ordenamiento de productos
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

  // Ordenar productos filtrados
  const productosOrdenados = useMemo(() => {
    if (!sortColumn) return productosFiltrados;

    return [...productosFiltrados].sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];

      // Manejo especial para talla (numérico)
      if (sortColumn === 'talla') {
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
  }, [productosFiltrados, sortColumn, sortDirection]);

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

  // Remover un filtro específico de productos
  const handleRemoveFilterProducto = (filterKey) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: ''
    }));
  };

  // Labels para filtros de productos
  const filterLabels = {
    modelo: 'Modelo',
    color: 'Color',
    talla: 'Talla',
    sucursal: 'Sucursal'
  };

  // Labels para valores de filtros de productos
  const valueLabels = {
    modelo: {
      'nike': 'Nike',
      'adidas': 'Adidas',
      'nb': 'New Balance'
    },
    color: {
      'verde': 'Verde',
      'negro': 'Negro',
      'blanco': 'Blanco',
      'gris': 'Gris'
    },
    talla: {
      '39': '39',
      '40': '40',
      '41': '41',
      '42': '42'
    },
    sucursal: {
      'lima': 'Lima Centro'
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
        Inventario
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-1 gap-4">
        {/* Columna izquierda: Buscar producto + Lista productos */}
        <div className="space-y-4">
          {/* BUSCAR PRODUCTO */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-neutral-01 rounded-3xl shadow-md border border-neutral-02 p-6">
              
              <div className="mb-5">
                <InventoryCardHeader title={"Buscar Producto"} />
                <p className="text-sm text-gray-600 mt-2">
                  Filtra por modelo, color, talla y sucursal
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <Select
                  title="Modelo"
                  placeholder="Seleccionar modelo"
                  options={[
                    { value: 'nike', label: 'Nike' },
                    { value: 'adidas', label: 'Adidas' },
                    { value: 'nb', label: 'New Balance' }
                  ]}
                  value={filters.modelo}
                  onChange={(e) => setFilters({ ...filters, modelo: e.target.value })}
                />
                <Select
                  title="Color"
                  placeholder="Seleccionar color"
                  options={[
                    { value: 'verde', label: 'Verde' },
                    { value: 'negro', label: 'Negro' },
                    { value: 'blanco', label: 'Blanco' },
                    { value: 'gris', label: 'Gris' }
                  ]}
                  value={filters.color}
                  onChange={(e) => setFilters({ ...filters, color: e.target.value })}
                />
                <Select
                  title="Talla"
                  placeholder="Seleccionar talla"
                  options={[
                    { value: '39', label: '39' },
                    { value: '40', label: '40' },
                    { value: '41', label: '41' },
                    { value: '42', label: '42' }
                  ]}
                  value={filters.talla}
                  onChange={(e) => setFilters({ ...filters, talla: e.target.value })}
                />
                <Select
                  title="Sucursal"
                  placeholder="Seleccionar sucursal"
                  options={[{ value: 'lima', label: 'Lima Centro' }]}
                  value={filters.sucursal}
                  onChange={(e) => setFilters({ ...filters, sucursal: e.target.value })}
                />
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-neutral-02">
                <Button
                  size="medium"
                  variant="white"
                  className="flex items-center gap-2"
                  onClick={limpiarFiltrosProductos}
                  icon={<MdFilterAltOff className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Limpiar filtros
                </Button>
                <Button
                  size="medium"
                  variant="secondaryUNO"
                  className="flex items-center gap-2"
                  icon={<FaSearch className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Buscar
                </Button>
              </div>
            </div>


            <div className="bg-neutral-01 rounded-3xl shadow-md border border-neutral-02 p-4">
              {/* Header: título + subtítulo + botón */}
              <div className="flex items-center justify-between mb-3">
                <InventoryCardHeader title="Ingresos recientes" className='flex-1 mr-3.5' />

                <Link to="/inventario/ingreso">
                  <Button
                    size="medium"
                    variant="secondaryUNO"
                    iconPosition="right"
                    className="flex items-center gap-2 m-2 whitespace-nowrap"
                  >
                    Ver todos los ingresos
                  </Button>
                </Link>
              </div>

              {/* Tabla con scroll y header sticky */}
              <div className="max-h-[180px] overflow-y-auto rounded-2xl">
                <table className="w-full">
                  <thead className="bg-[#1B8EF2] sticky top-0 z-10">
                    <tr>
                      <th className="px-2 py-3 text-xs font-medium text-white text-center">
                        ID Ingreso
                      </th>
                      <th className="px-2 py-3 text-xs font-medium text-white text-center">
                        Proveedor
                      </th>
                      <th className="px-2 py-3 text-xs font-medium text-white text-center">
                        Total (S/.)
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {ingresos.slice(0, 5).length > 0 ? (
                      ingresos.slice(0, 5).map((ing, index) => (
                        <tr
                          key={index}
                          className="border-b border-[#E4E7EE] hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-2 py-3 text-sm text-center text-[#0F172A]">
                            {ing.id}
                          </td>
                          <td className="px-2 py-3 text-sm text-center text-[#0F172A]">
                            {ing.proveedor}
                          </td>
                          <td className="px-2 py-3 text-sm text-center text-[#0F172A]">
                            S/.{" "}
                            {ing.costoTotal.toLocaleString("es-PE", {
                              minimumFractionDigits: 2,
                            })}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-4 py-8 text-sm text-center text-gray-500"
                        >
                          No hay ingresos recientes para mostrar
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
          {/* LISTA DE PRODUCTOS */}

          <div className="bg-neutral-01 rounded-3xl shadow-md border border-neutral-02 p-4">
            {/* Título + subtítulo, igual que en las otras cards */}
            <div className='mx-0'>
              <InventoryCardHeader title="Lista de productos" />
              <p className="text-sm text-gray-600 mt-1">
                Resultados según filtros aplicados · {productosOrdenados.length} resultado{productosOrdenados.length !== 1 ? 's' : ''}
              </p>

              {/* Chips de filtros activos */}
              <ActiveFiltersChips
                filters={filters}
                onRemoveFilter={handleRemoveFilterProducto}
                filterLabels={filterLabels}
                valueLabels={valueLabels}
              />
            </div>

            {/* Contenedor scrollable con header sticky (mismo estilo que la tabla de ventas) */}
            <div className="max-h-[400px] overflow-y-auto rounded-2xl">
              <table className="w-full">
                <thead className="bg-[#1B8EF2] sticky top-0 z-10">
                  <tr>
                    <SortableTableHeader
                      column="sku"
                      label="SKU"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={handleSort}
                    />
                    <SortableTableHeader
                      column="producto"
                      label="Producto"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={handleSort}
                    />
                    <SortableTableHeader
                      column="color"
                      label="Color"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={handleSort}
                    />
                    <SortableTableHeader
                      column="talla"
                      label="Talla"
                      sortColumn={sortColumn}
                      sortDirection={sortDirection}
                      onSort={handleSort}
                    />
                    <SortableTableHeader
                      column=""
                      label="Detalle"
                      sortable={false}
                      className="px-6"
                    />
                  </tr>
                </thead>

                <tbody>
                  {productosOrdenados.length > 0 ? (
                    productosOrdenados.map((p, index) => (
                      <tr
                        key={index}
                        className="border-b border-[#E4E7EE] hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-2 py-3 text-sm text-center text-[#0F172A]">
                          {p.sku}
                        </td>
                        <td className="px-2 py-3 text-sm text-center text-[#0F172A]">
                          {p.producto}
                        </td>
                        <td className="px-2 py-3 text-sm text-center text-[#0F172A]">
                          {p.color}
                        </td>
                        <td className="px-2 py-3 text-sm text-center text-[#0F172A]">
                          {p.talla}
                        </td>
                        <td className="px-2 py-3 text-center">
                          <Button
                            size="small"
                            variant="white"
                            icon={<FaInfoCircle className="w-5 h-5" />}
                            iconPosition="right"
                            onClick={() => handleVerDetalleProducto(p)}
                          >
                            Ver detalle
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-sm text-center text-gray-500"
                      >
                        No se encontraron productos con los filtros seleccionados
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
        width='max-w-xl'
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
                  <thead className="bg-primary-01 text-text-03">
                    <tr>
                      <th className="px-2 py-2 font-semibold text-text-03 text-center">
                        ID Ingreso
                      </th>
                      <th className="px-2 py-2 font-semibold text-text-03 text-center">
                        Cantidad
                      </th>
                      <th className="px-2 py-2 font-semibold text-text-03 text-center">
                        Costo total (S/.)
                      </th>
                      <th className="px-2 py-2 font-semibold text-text-03 text-center">
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