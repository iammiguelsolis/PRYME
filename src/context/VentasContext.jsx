// ========================================
// src/context/VentasContext.jsx
// ========================================

import { createContext, useContext, useState } from 'react';

const VentasContext = createContext();

// Datos iniciales de ventas
const ventasIniciales = [
  {
    id: '26374',
    cliente: 'Juan',
    clienteFull: 'María González Pérez',
    doc: '77777777',
    dni: '73456789',
    telefono: '+51 987 654 321',
    canal: 'Tik Tok',
    sucursal: 'Lima Centro',
    metodo: 'Yape',
    vendedor: 'Juan Pérez',
    fecha: '2025-11-20',
    subtotal: 580,
    descuento: 120,
    total: 460,
    productos: [
      { id: 1, modelo: 'Nike Dunk SB', cantidad: 1, color: 'Verde', talla: '42', precioUnitario: 580, subtotal: 580 }
    ]
  },
  {
    id: '26373',
    cliente: 'Carlos',
    clienteFull: 'Carlos Mendoza López',
    doc: '88888888',
    dni: '88888888',
    telefono: '+51 912 345 678',
    canal: 'Instagram',
    sucursal: 'No físico',
    metodo: 'Plin',
    vendedor: 'Ana García',
    fecha: '2025-11-19',
    subtotal: 840,
    descuento: 0,
    total: 840,
    productos: [
      { id: 1, modelo: 'Adidas Samba', cantidad: 2, color: 'Blanco', talla: '40', precioUnitario: 280, subtotal: 560 },
      { id: 2, modelo: 'Nike Air Force', cantidad: 1, color: 'Negro', talla: '41', precioUnitario: 280, subtotal: 280 }
    ]
  },
];

// Datos de clientes para autocompletar
const clientesIniciales = [
  { dni: '73456789', nombre: 'María González Pérez', telefono: '+51 987 654 321' },
  { dni: '88888888', nombre: 'Carlos Mendoza López', telefono: '+51 912 345 678' },
  { dni: '99999999', nombre: 'Ana Torres Ruiz', telefono: '+51 945 678 123' },
];

export const VentasProvider = ({ children }) => {
  const [ventas, setVentas] = useState(ventasIniciales);
  const [clientes, setClientes] = useState(clientesIniciales);

  // Generar nuevo ID de venta
  const generarIdVenta = () => {
    const maxId = Math.max(...ventas.map(v => parseInt(v.id)));
    return String(maxId + 1);
  };

  // Buscar cliente por DNI
  const buscarClientePorDni = (dni) => {
    return clientes.find(c => c.dni === dni);
  };

  // Registrar nueva venta
  const registrarVenta = (datosVenta) => {
    const nuevoId = generarIdVenta();
    const fechaHoy = new Date().toISOString().split('T')[0];

    const nuevaVenta = {
      id: nuevoId,
      cliente: datosVenta.nombreCliente.split(' ')[0], // Primer nombre
      clienteFull: datosVenta.nombreCliente,
      doc: datosVenta.dni,
      dni: datosVenta.dni,
      telefono: datosVenta.telefono,
      canal: datosVenta.canal,
      sucursal: datosVenta.sucursal,
      metodo: datosVenta.metodoPago,
      vendedor: datosVenta.vendedor || 'Usuario Actual',
      fecha: fechaHoy,
      subtotal: datosVenta.subtotal,
      descuento: datosVenta.descuento || 0,
      total: datosVenta.total,
      productos: datosVenta.productos
    };

    setVentas(prev => [nuevaVenta, ...prev]);

    // Si es cliente nuevo, agregarlo
    const clienteExiste = clientes.find(c => c.dni === datosVenta.dni);
    if (!clienteExiste && datosVenta.dni) {
      setClientes(prev => [...prev, {
        dni: datosVenta.dni,
        nombre: datosVenta.nombreCliente,
        telefono: datosVenta.telefono
      }]);
    }

    return nuevoId;
  };

  // Registrar devolución
  const registrarDevolucion = (ventaId, productosDevueltos) => {
    setVentas(prev => prev.map(venta => {
      if (venta.id === ventaId) {
        const productosRestantes = venta.productos.filter(
          (_, index) => !productosDevueltos.includes(index)
        );
        const nuevoTotal = productosRestantes.reduce((sum, p) => sum + p.subtotal, 0);
        
        return {
          ...venta,
          productos: productosRestantes,
          subtotal: nuevoTotal,
          total: nuevoTotal - venta.descuento
        };
      }
      return venta;
    }));
  };

  // Calcular ventas del día
  const ventasDelDia = () => {
    const hoy = new Date().toISOString().split('T')[0];
    return ventas
      .filter(v => v.fecha === hoy)
      .reduce((sum, v) => sum + v.total, 0);
  };

  return (
    <VentasContext.Provider value={{
      ventas,
      clientes,
      registrarVenta,
      registrarDevolucion,
      buscarClientePorDni,
      ventasDelDia,
      setVentas
    }}>
      {children}
    </VentasContext.Provider>
  );
};

export const useVentas = () => {
  const context = useContext(VentasContext);
  if (!context) {
    throw new Error('useVentas debe usarse dentro de VentasProvider');
  }
  return context;
};