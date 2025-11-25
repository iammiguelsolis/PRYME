import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventario } from '../../../context/InventarioContext';

import { EntryInfoForm } from '../components/organisms/EntryInfoForm';
import { BatchList } from '../components/organisms/BatchList';
import { EntryTotal } from '../components/organisms/EntryTotal';
import { AddProductModal } from '../components/organisms/AddProductModal';
import { SuccessModal } from '../components/organisms/SuccessModal';

const RegistrarIngresoPage = () => {
  const navigate = useNavigate();
  const { registrarIngreso } = useInventario();

  // Estados para modales
  const [isSuccessProductOpen, setSuccessProductOpen] = useState(false);


  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false); // <-- Nombre corregido
  const [nuevoIngresoId, setNuevoIngresoId] = useState(null);

  // Estado del formulario de ingreso
  const initialIngresoState = {
    proveedor: '',
    telefono: '',
    tipo: 'compra',
    sucursal: 'lima',
    fecha: new Date().toISOString().split('T')[0],
  };
  const [datosIngreso, setDatosIngreso] = useState(initialIngresoState);

  // Lista de lotes/productos a ingresar
  const [lotes, setLotes] = useState([]);

  // Agregar producto al lote
  const handleAddProduct = (nuevoProducto) => {
    setLotes(prev => [...prev, {
      id: Date.now(),
      modelo: nuevoProducto.modelo,
      color: nuevoProducto.color,
      talla: nuevoProducto.talla,
      cantidad: nuevoProducto.cantidad,
      costoUnitario: nuevoProducto.costoUnitario,
    }]);

    setAddModalOpen(false);
    setSuccessProductOpen(true);   // 👈 para mostrar el modal de éxito de producto
  };


  // Eliminar producto del lote
  const handleRemoveProduct = (id) => {
    setLotes(prev => prev.filter(l => l.id !== id));
  };

  // Calcular totales
  const totalUnidades = lotes.reduce((sum, l) => sum + l.cantidad, 0);
  const totalCosto = lotes.reduce((sum, l) => sum + (l.cantidad * l.costoUnitario), 0);

  // Registrar el ingreso completo
  const handleRegistrarIngreso = () => {
    if (lotes.length === 0) {
      alert('Debe agregar al menos un producto');
      return;
    }
    if (!datosIngreso.proveedor) {
      alert('Debe seleccionar un proveedor');
      return;
    }

    // Llamar al contexto para registrar
    const idGenerado = registrarIngreso({
      ...datosIngreso,
      lotes: lotes
    });

    setNuevoIngresoId(idGenerado);
    setSuccessModalOpen(true); // <-- CORREGIDO (antes: setIsSuccessModalOpen)
  };

  // Después del éxito
  const handleSuccessClose = () => {
    setSuccessModalOpen(false);
    setLotes([]);              // aquí sí tiene sentido limpiar
    setDatosIngreso(initialIngresoState);
  };

  const handleSuccessProductClose = () => {
    setSuccessProductOpen(false);   // solo cerrar el modal
  };

  const handleAddOtherProduct = () => {
    setSuccessProductOpen(false);   // cierro el modal de éxito
    setAddModalOpen(true);          // vuelvo a abrir el modal de agregar producto
  };

  const handleVolverAInventario = () => {
    setSuccessModalOpen(false); // <-- CORREGIDO
    navigate('/inventario');
  };


  return (
    <div className="h-screen flex flex-col p-6 bg-neutral-03">
      {/* Breadcrumb */}
      <h1 className="text-l font-bold text-text-01 bg-neutral-01 rounded-4xl shadow-md p-2 px-4 flex flex-col mb-4">
        Inventario / Ingresos / Registrar Ingreso
      </h1>

      {/* Formulario info del ingreso */}
      <EntryInfoForm 
        datos={datosIngreso}
        onChange={setDatosIngreso}
      />

      {/* Lista de productos/lotes */}
      <BatchList 
        lotes={lotes}
        onAddProductClick={() => setAddModalOpen(true)}
        onRemoveProduct={handleRemoveProduct}
      />

      {/* Totales */}
      <EntryTotal 
        totalUnidades={totalUnidades}
        totalCosto={totalCosto}
        onRegisterSaleClick={handleRegistrarIngreso}
        onCancelClick={() => navigate('/inventario')}
      />

      {/* Modal Agregar Producto */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddProduct}
      />

      {/* Producto añadido */}
      {/* Modal éxito al añadir producto */}
      <SuccessModal
        title="Producto añadido con éxito"
        isOpen={isSuccessProductOpen}
        onClose={handleSuccessProductClose}
        onRegisterAnother={handleAddOtherProduct}
      />

      {/* Modal éxito al registrar ingreso */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessClose}
        onRegisterAnother={handleSuccessClose}
      />


    </div>
  );
};

export default RegistrarIngresoPage;