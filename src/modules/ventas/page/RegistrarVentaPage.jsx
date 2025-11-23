// ========================================
// src/modules/ventas/page/RegistrarVentaPage.jsx
// ========================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVentas } from '../../../context/VentasContext';

import { ClientInfoForm } from '../components/organismos/ClientInfoForm';
import { ProductList } from '../components/organismos/ProductList';
import { SaleTotal } from '../components/organismos/SaleTotal';
import { AddProductModal } from '../components/organismos/AddProductModal';
import { SuccessModal } from '../components/organismos/SuccessModal';

const RegistrarVentaPage = () => {
  const navigate = useNavigate();
  const { registrarVenta, buscarClientePorDni } = useVentas();

  // Estados para modales
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isVentaSuccessOpen, setVentaSuccessOpen] = useState(false);
  const [nuevaVentaId, setNuevaVentaId] = useState(null);

  // Estado del cliente
  const [datosCliente, setDatosCliente] = useState({
    nombreCliente: '',
    dni: '',
    telefono: '',
    canal: '',
    sucursal: 'nofisico',
    metodoPago: '',
  });

  // Lista de productos en la venta
  const [productosVenta, setProductosVenta] = useState([]);

  // Descuento
  const [descuento, setDescuento] = useState(0);

  // Buscar cliente cuando cambia el DNI
  const handleDniChange = (dni) => {
    setDatosCliente(prev => ({ ...prev, dni }));
    
    // Autocompletar si encuentra cliente
    if (dni.length >= 8) {
      const cliente = buscarClientePorDni(dni);
      if (cliente) {
        setDatosCliente(prev => ({
          ...prev,
          nombreCliente: cliente.nombre,
          telefono: cliente.telefono
        }));
      }
    }
  };

  // Agregar producto a la venta
  const handleAddProduct = (nuevoProducto) => {
    setProductosVenta(prev => [...prev, {
      id: Date.now(),
      modelo: nuevoProducto.modelo,
      color: nuevoProducto.color,
      talla: nuevoProducto.talla,
      cantidad: nuevoProducto.cantidad,
      precioUnitario: nuevoProducto.precioUnitario,
      subtotal: nuevoProducto.cantidad * nuevoProducto.precioUnitario,
    }]);
    setAddModalOpen(false);
    setSuccessModalOpen(true);
  };

  // Eliminar producto
  const handleRemoveProduct = (id) => {
    setProductosVenta(prev => prev.filter(p => p.id !== id));
  };

  // Calcular totales
  const subtotal = productosVenta.reduce((sum, p) => sum + p.subtotal, 0);
  const total = subtotal - descuento;

  // Registrar la venta
  const handleRegistrarVenta = () => {
    if (productosVenta.length === 0) {
      alert('Debe agregar al menos un producto');
      return;
    }
    if (!datosCliente.nombreCliente) {
      alert('Debe ingresar el nombre del cliente');
      return;
    }
    if (!datosCliente.canal) {
      alert('Debe seleccionar un canal de venta');
      return;
    }
    if (!datosCliente.metodoPago) {
      alert('Debe seleccionar un método de pago');
      return;
    }

    const idGenerado = registrarVenta({
      ...datosCliente,
      productos: productosVenta,
      subtotal,
      descuento,
      total
    });

    setNuevaVentaId(idGenerado);
    setVentaSuccessOpen(true);
  };

  // Limpiar formulario después de registrar
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
  };

  return (
    <div className="h-screen flex flex-col p-6 bg-neutral-03">
      {/* Breadcrumb */}
      <h1 className="text-l font-bold text-text-01 bg-neutral-01 rounded-4xl shadow-md p-2 px-4 flex flex-col mb-4">
        Ventas / Registrar Venta
      </h1>

      {/* Formulario cliente */}
      <ClientInfoForm 
        datos={datosCliente}
        onChange={setDatosCliente}
        onDniChange={handleDniChange}
      />

      {/* Lista de productos */}
      <ProductList 
        productos={productosVenta}
        onAddProductClick={() => setAddModalOpen(true)}
        onRemoveProduct={handleRemoveProduct}
      />

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