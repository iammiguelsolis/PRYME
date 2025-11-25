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

  // ===== Errores de validación (inline) =====
  const [errors, setErrors] = useState({});

  // ===== Modales =====
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isSuccessProductOpen, setSuccessProductOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [nuevoIngresoId, setNuevoIngresoId] = useState(null);

  // ==========================
  // Handlers de formulario
  // ==========================
  const handleIngresoChange = (nuevoDatos) => {
    setDatosIngreso(nuevoDatos);

    // Limpieza de errores campo a campo
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

    // Si había error de lotes, lo limpiamos
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated.lotes;
      return updated;
    });

    setAddModalOpen(false);
    setSuccessProductOpen(true); // modal "Producto añadido con éxito"
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

  // ==========================
  // Validación (sin alert())
  // ==========================
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
      // Si hay errores, no seguimos
      return;
    }

    const idGenerado = registrarIngreso({
      ...datosIngreso,
      lotes: lotes,
    });

    setNuevoIngresoId(idGenerado);
    setSuccessModalOpen(true);
  };

  // Después del éxito (ingreso completo)
  const handleSuccessClose = () => {
    setSuccessModalOpen(false);
    setLotes([]);
    setDatosIngreso(initialIngresoState);
    setErrors({});
  };

  // Modal "producto añadido"
  const handleSuccessProductClose = () => {
    setSuccessProductOpen(false);
  };

  const handleAddOtherProduct = () => {
    setSuccessProductOpen(false);
    setAddModalOpen(true);
  };

  const handleVolverAInventario = () => {
    setSuccessModalOpen(false);
    navigate('/inventario');
  };

  // ==========================
  // JSX
  // ==========================
  return (
    <div className="h-screen flex flex-col p-6 bg-neutral-03">
      {/* Breadcrumb */}
      <h1 className="text-l font-bold text-text-01 bg-neutral-01 rounded-4xl shadow-md p-2 px-4 flex flex-col mb-4">
        Inventario / Ingresos / Registrar Ingreso
      </h1>

      {/* Formulario info del ingreso */}
      <EntryInfoForm
        datos={datosIngreso}
        onChange={handleIngresoChange}
        errors={errors}               // 👈 aquí pasan los errores a los Select/Input
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
