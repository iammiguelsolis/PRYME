// src/modules/inventario/page/RegistrarIngresoPage.jsx (MODIFICADO con ayuda contextual)

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventario } from '../../../context/InventarioContext';
import { useKeyboardNavigation } from '../../../hooks/useKeyboardNavigation';
import { ContextualHelp } from '../../../globals/components/moleculas/ContextualHelp';

import { EntryInfoForm } from '../components/organisms/EntryInfoForm';
import { BatchList } from '../components/organisms/BatchList';
import { EntryTotal } from '../components/organisms/EntryTotal';
import { AddProductModal } from '../components/organisms/AddProductModal';
import { SuccessModal } from '../components/organisms/SuccessModal';

const RegistrarIngresoPage = () => {
  const navigate = useNavigate();
  const { registrarIngreso } = useInventario();

  // ===== Estado base del formulario =====
  const initialIngresoState = {
    proveedor: '',
    telefono: '',
    tipo: 'compra',
    sucursal: 'lima',
    fecha: new Date().toISOString().split('T')[0],
  };

  const [datosIngreso, setDatosIngreso] = useState(initialIngresoState);
  const [lotes, setLotes] = useState([]);

  // ===== Errores de validación =====
  const [errors, setErrors] = useState({});

  // ===== Modales =====
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isSuccessProductOpen, setSuccessProductOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [nuevoIngresoId, setNuevoIngresoId] = useState(null);

  // ===== Navegación por teclado =====
  useKeyboardNavigation({
    onSave: () => {
      if (lotes.length > 0) {
        handleRegistrarIngreso();
      }
    },
    onCancel: () => {
      if (isAddModalOpen) {
        setAddModalOpen(false);
      } else if (isSuccessProductOpen) {
        setSuccessProductOpen(false);
      } else if (isSuccessModalOpen) {
        setSuccessModalOpen(false);
      } else {
        navigate('/inventario');
      }
    }
  });

  // Handlers de formulario
  const handleIngresoChange = (nuevoDatos) => {
    setDatosIngreso(nuevoDatos);

    setErrors((prev) => {
      const updated = { ...prev };
      if (nuevoDatos.proveedor) delete updated.proveedor;
      if (nuevoDatos.sucursal) delete updated.sucursal;
      if (nuevoDatos.fecha) delete updated.fecha;
      return updated;
    });
  };

  // Agregar producto al lote
  const handleAddProduct = (nuevoProducto) => {
    setLotes((prev) => [
      ...prev,
      {
        id: Date.now(),
        modelo: nuevoProducto.modelo,
        color: nuevoProducto.color,
        talla: nuevoProducto.talla,
        cantidad: nuevoProducto.cantidad,
        costoUnitario: nuevoProducto.costoUnitario,
      },
    ]);

    setErrors((prev) => {
      const updated = { ...prev };
      delete updated.lotes;
      return updated;
    });

    setAddModalOpen(false);
    setSuccessProductOpen(true);
  };

  // Eliminar producto del lote
  const handleRemoveProduct = (id) => {
    setLotes((prev) => prev.filter((l) => l.id !== id));
  };

  // Calcular totales
  const totalUnidades = lotes.reduce((sum, l) => sum + l.cantidad, 0);
  const totalCosto = lotes.reduce(
    (sum, l) => sum + l.cantidad * l.costoUnitario,
    0
  );

  // Validación
  const validate = () => {
    const newErrors = {};

    if (!datosIngreso.proveedor) {
      newErrors.proveedor = 'Debes seleccionar un proveedor.';
    }

    if (!datosIngreso.sucursal) {
      newErrors.sucursal = 'Debes seleccionar una sucursal.';
    }

    if (!datosIngreso.fecha) {
      newErrors.fecha = 'Debes seleccionar una fecha.';
    }

    if (lotes.length === 0) {
      newErrors.lotes = 'Debes agregar al menos un producto al ingreso.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Registrar el ingreso completo
  const handleRegistrarIngreso = () => {
    if (!validate()) {
      return;
    }

    const idGenerado = registrarIngreso({
      ...datosIngreso,
      lotes: lotes,
    });

    setNuevoIngresoId(idGenerado);
    setSuccessModalOpen(true);
  };

  // Después del éxito
  const handleSuccessClose = () => {
    setSuccessModalOpen(false);
    setLotes([]);
    setDatosIngreso(initialIngresoState);
    setErrors({});
  };

  const handleSuccessProductClose = () => {
    setSuccessProductOpen(false);
  };

  const handleAddOtherProduct = () => {
    setSuccessProductOpen(false);
    setAddModalOpen(true);
  };

  return (
    <div className="h-screen flex flex-col p-6 bg-neutral-03">
      {/* Breadcrumb */}
      <h1 className="text-l font-bold text-text-01 bg-neutral-01 rounded-4xl shadow-md p-2 px-4 flex flex-col mb-4">
        Inventario / Ingresos / Registrar Ingreso
      </h1>

      {/* ===== AYUDA CONTEXTUAL ===== */}
      <ContextualHelp
        title="¿Cómo registrar un ingreso de inventario?"
        variant="info"
        steps={[
          "Selecciona el proveedor, la sucursal de destino y confirma la fecha del ingreso.",
          "Haz clic en 'Añadir Producto' para agregar cada producto del lote.",
          "Para cada producto, ingresa: modelo, color, talla, cantidad y costo unitario.",
          "Revisa el resumen: total de unidades y costo total del ingreso.",
          "Haz clic en 'Registrar Ingreso' o presiona Ctrl+S para completar."
        ]}
        tips={[
          "Si el producto ya existe, el sistema actualizará automáticamente su stock.",
          "Puedes agregar múltiples productos en un mismo ingreso.",
          "Los costos unitarios se actualizarán con cada nuevo ingreso.",
          "Presiona ESC para cancelar la operación en cualquier momento."
        ]}
        className="mb-4"
      />

      {/* Formulario info del ingreso */}
      <EntryInfoForm
        datos={datosIngreso}
        onChange={handleIngresoChange}
        errors={errors}
      />

      {/* Lista de productos/lotes */}
      <BatchList
        lotes={lotes}
        onAddProductClick={() => setAddModalOpen(true)}
        onRemoveProduct={handleRemoveProduct}
      />

      {/* Error asociado a lotes */}
      {errors.lotes && (
        <p className="mt-2 text-l font-bold text-red-500">
          {errors.lotes}
        </p>
      )}

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