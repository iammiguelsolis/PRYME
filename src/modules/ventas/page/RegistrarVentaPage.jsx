
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVentas } from '../../../context/VentasContext';
import { useKeyboardNavigation } from '../../../hooks/useKeyboardNavigation';
import { ContextualHelp } from '../../../globals/components/moleculas/ContextualHelp';

import { ClientInfoForm } from '../components/organismos/ClientInfoForm';
import { ProductList } from '../components/organismos/ProductList';
import { SaleTotal } from '../components/organismos/SaleTotal';
import { AddProductModal } from '../components/organismos/AddProductModal';
import { SuccessModal } from '../components/organismos/SuccessModal';

const RegistrarVentaPage = () => {
  const navigate = useNavigate();
  const { registrarVenta, buscarClientePorDni } = useVentas();

  // ====== Modales ======
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isVentaSuccessOpen, setVentaSuccessOpen] = useState(false);
  const [nuevaVentaId, setNuevaVentaId] = useState(null);

  // ====== Cliente ======
  const [datosCliente, setDatosCliente] = useState({
    nombreCliente: '',
    dni: '',
    telefono: '',
    canal: '',
    sucursal: 'nofisico',
    metodoPago: '',
  });

  // ====== Validaciones ======
  const [errors, setErrors] = useState({});

  // ====== Productos ======
  const [productosVenta, setProductosVenta] = useState([]);
  const [descuento, setDescuento] = useState(0);

  // ====== Navegación por teclado ======
  useKeyboardNavigation({
    onSave: () => {
      // Ctrl+S para guardar
      if (productosVenta.length > 0) {
        handleRegistrarVenta();
      }
    },
    onCancel: () => {
      // ESC para cancelar
      if (isAddModalOpen) {
        setAddModalOpen(false);
      } else if (isSuccessModalOpen) {
        setSuccessModalOpen(false);
      } else if (isVentaSuccessOpen) {
        setVentaSuccessOpen(false);
      } else {
        navigate('/ventas');
      }
    }
  });

  // Buscar cliente cuando cambia el DNI
  const handleDniChange = (dni) => {
    setDatosCliente((prev) => ({ ...prev, dni }));

    if (dni.length >= 8) {
      const cliente = buscarClientePorDni(dni);
      if (cliente) {
        setDatosCliente((prev) => ({
          ...prev,
          nombreCliente: cliente.nombre,
          telefono: cliente.telefono,
        }));
      }
    }

    setErrors((prev) => {
      const newErr = { ...prev };
      delete newErr.dni;
      return newErr;
    });
  };

  // Agregar producto
  const handleAddProduct = (nuevoProducto) => {
    setProductosVenta((prev) => [
      ...prev,
      {
        id: Date.now(),
        modelo: nuevoProducto.modelo,
        color: nuevoProducto.color,
        talla: nuevoProducto.talla,
        cantidad: nuevoProducto.cantidad,
        precioUnitario: nuevoProducto.precioUnitario,
        subtotal: nuevoProducto.cantidad * nuevoProducto.precioUnitario,
      },
    ]);

    setErrors((prev) => {
      const newErr = { ...prev };
      delete newErr.productos;
      return newErr;
    });

    setAddModalOpen(false);
    setSuccessModalOpen(true);
  };

  // Eliminar producto
  const handleRemoveProduct = (id) => {
    setProductosVenta((prev) => prev.filter((p) => p.id !== id));
  };

  // Totales
  const subtotal = productosVenta.reduce((sum, p) => sum + p.subtotal, 0);
  const total = subtotal - descuento;

  // Validación
  const validarFormulario = () => {
    const newErrors = {};

    if (productosVenta.length === 0) {
      newErrors.productos = 'Debes agregar al menos un producto.';
    }

    if (!datosCliente.nombreCliente.trim()) {
      newErrors.nombreCliente = 'Debes ingresar el nombre del cliente.';
    }

    if (!datosCliente.dni.trim()) {
      newErrors.dni = 'Debes ingresar el documento de identidad.';
    }

    if (!datosCliente.canal) {
      newErrors.canal = 'Debes seleccionar un canal de venta.';
    }

    if (!datosCliente.metodoPago) {
      newErrors.metodoPago = 'Debes seleccionar un método de pago.';
    }

    if (!datosCliente.telefono) {
      newErrors.telefono = 'Debes ingresar el teléfono del cliente.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Registrar la venta
  const handleRegistrarVenta = () => {
    if (!validarFormulario()) return;

    const idGenerado = registrarVenta({
      ...datosCliente,
      productos: productosVenta,
      subtotal,
      descuento,
      total,
    });

    setNuevaVentaId(idGenerado);
    setVentaSuccessOpen(true);
  };

  // Limpiar formulario
  const limpiarFormulario = () => {
    setProductosVenta([]);
    setDescuento(0);
    setDatosCliente({
      nombreCliente: '',
      dni: '',
      telefono: '',
      canal: '',
      sucursal: 'nofisico',
      metodoPago: '',
    });
    setErrors({});
  };

  return (
    <div className="h-screen flex flex-col p-6 bg-neutral-03">
      {/* Breadcrumb */}
      <h1 className="text-l font-bold text-text-01 bg-neutral-01 rounded-4xl shadow-md p-2 px-4 flex flex-col mb-4">
        Ventas / Registrar Venta
      </h1>

      {/* ===== AYUDA CONTEXTUAL ===== */}
      <ContextualHelp
        title="¿Cómo registrar una venta?"
        variant="info"
        steps={[
          "Completa los datos del cliente: nombre, DNI, teléfono, canal y método de pago.",
          "Haz clic en 'Añadir Producto' para agregar los productos que se venderán.",
          "Opcionalmente, aplica un descuento en la sección de totales.",
          "Revisa el resumen: verifica productos, cantidades y el total final.",
          "Haz clic en 'Registrar Venta' o presiona Ctrl+S para completar."
        ]}
        tips={[
          "Si el cliente ya existe, al ingresar su DNI se autocompletarán sus datos.",
          "Puedes agregar múltiples productos antes de registrar la venta.",
          "El sistema te alertará si aplicas un descuento mayor al 50%.",
          "Presiona ESC para cancelar en cualquier momento."
        ]}
        className="mb-4"
      />

      {/* Formulario Cliente */}
      <ClientInfoForm
        datos={datosCliente}
        onChange={setDatosCliente}
        onDniChange={handleDniChange}
        errors={errors}
      />

      {/* Lista de Productos */}
      <ProductList
        productos={productosVenta}
        onAddProductClick={() => setAddModalOpen(true)}
        onRemoveProduct={handleRemoveProduct}
      />

      {/* Error si no hay productos */}
      {errors.productos && (
        <p className="text-red-500 text-xs mt-2">{errors.productos}</p>
      )}

      {/* Totales */}
      <SaleTotal
        subtotal={subtotal}
        descuento={descuento}
        total={total}
        onDescuentoChange={setDescuento}
        onRegisterSaleClick={handleRegistrarVenta}
        onCancelClick={() => navigate('/ventas')}
      />

      {/* Modal Agregar Producto */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddProduct}
      />

      {/* Modal Producto Añadido */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        title="Producto Añadido con Éxito"
        primaryActionText="Añadir otro Producto"
        secondaryActionText="Continuar"
        onPrimaryAction={() => {
          setSuccessModalOpen(false);
          setAddModalOpen(true);
        }}
        onSecondaryAction={() => setSuccessModalOpen(false)}
      />

      {/* Modal Venta Registrada */}
      <SuccessModal
        isOpen={isVentaSuccessOpen}
        onClose={() => {
          setVentaSuccessOpen(false);
          limpiarFormulario();
        }}
        title="¡Venta Registrada con Éxito!"
        message={`ID de Venta: ${nuevaVentaId}`}
        primaryActionText="Registrar otra Venta"
        secondaryActionText="Ir a Ventas"
        onPrimaryAction={() => {
          setVentaSuccessOpen(false);
          limpiarFormulario();
        }}
        onSecondaryAction={() => {
          setVentaSuccessOpen(false);
          navigate('/ventas');
        }}
      />
    </div>
  );
};

export default RegistrarVentaPage;