// ========================================
// src/context/VentasContext.jsx
// ========================================

import { createContext, useContext, useState } from 'react';

const VentasContext = createContext();

// Datos iniciales de ventas (varios meses)
const ventasIniciales = [
  // Noviembre 2025
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
  {
    id: '26372',
    cliente: 'Ana',
    clienteFull: 'Ana Torres Ruiz',
    doc: '99999999',
    dni: '99999999',
    telefono: '+51 945 678 123',
    canal: 'Facebook',
    sucursal: 'Lima Sur',
    metodo: 'Transferencia',
    vendedor: 'Luis Rodríguez',
    fecha: '2025-11-18',
    subtotal: 950,
    descuento: 95,
    total: 855,
    productos: [
      { id: 1, modelo: 'Jordan 1 Retro', cantidad: 1, color: 'Rojo', talla: '43', precioUnitario: 650, subtotal: 650 },
      { id: 2, modelo: 'Nike Cortez', cantidad: 1, color: 'Blanco', talla: '41', precioUnitario: 300, subtotal: 300 }
    ]
  },
  // Octubre 2025
  {
    id: '26371',
    cliente: 'Roberto',
    clienteFull: 'Roberto Sánchez Flores',
    doc: '66666666',
    dni: '66666666',
    telefono: '+51 923 456 789',
    canal: 'WhatsApp',
    sucursal: 'Lima Centro',
    metodo: 'Yape',
    vendedor: 'Juan Pérez',
    fecha: '2025-10-25',
    subtotal: 1120,
    descuento: 150,
    total: 970,
    productos: [
      { id: 1, modelo: 'Converse Chuck Taylor', cantidad: 2, color: 'Negro', talla: '40', precioUnitario: 280, subtotal: 560 },
      { id: 2, modelo: 'Puma RS-X', cantidad: 1, color: 'Gris', talla: '42', precioUnitario: 350, subtotal: 350 },
      { id: 3, modelo: 'Vans Old Skool', cantidad: 1, color: 'Azul', talla: '41', precioUnitario: 210, subtotal: 210 }
    ]
  },
  {
    id: '26370',
    cliente: 'Patricia',
    clienteFull: 'Patricia Díaz Morales',
    doc: '55555555',
    dni: '55555555',
    telefono: '+51 956 789 123',
    canal: 'Instagram',
    sucursal: 'No físico',
    metodo: 'Plin',
    vendedor: 'Ana García',
    fecha: '2025-10-20',
    subtotal: 720,
    descuento: 0,
    total: 720,
    productos: [
      { id: 1, modelo: 'Nike Air Max 90', cantidad: 2, color: 'Blanco', talla: '38', precioUnitario: 360, subtotal: 720 }
    ]
  },
  {
    id: '26369',
    cliente: 'Miguel',
    clienteFull: 'Miguel Quispe Mamani',
    doc: '44444444',
    dni: '44444444',
    telefono: '+51 987 123 456',
    canal: 'Tienda Física',
    sucursal: 'Lima Centro',
    metodo: 'Efectivo',
    vendedor: 'Luis Rodríguez',
    fecha: '2025-10-15',
    subtotal: 580,
    descuento: 0,
    total: 580,
    productos: [
      { id: 1, modelo: 'Adidas Ultraboost', cantidad: 1, color: 'Negro', talla: '42', precioUnitario: 580, subtotal: 580 }
    ]
  },
  // Septiembre 2025
  {
    id: '26368',
    cliente: 'Sandra',
    clienteFull: 'Sandra López Gutierrez',
    doc: '33333333',
    dni: '33333333',
    telefono: '+51 945 123 789',
    canal: 'Facebook',
    sucursal: 'Lima Sur',
    metodo: 'Transferencia',
    vendedor: 'Juan Pérez',
    fecha: '2025-09-28',
    subtotal: 890,
    descuento: 89,
    total: 801,
    productos: [
      { id: 1, modelo: 'Reebok Classic', cantidad: 1, color: 'Blanco', talla: '39', precioUnitario: 340, subtotal: 340 },
      { id: 2, modelo: 'Nike Blazer', cantidad: 1, color: 'Rojo', talla: '41', precioUnitario: 420, subtotal: 420 },
      { id: 3, modelo: 'Adidas Stan Smith', cantidad: 1, color: 'Verde', talla: '40', precioUnitario: 130, subtotal: 130 }
    ]
  },
  {
    id: '26367',
    cliente: 'Fernando',
    clienteFull: 'Fernando Castillo Acuña',
    doc: '22222222',
    dni: '22222222',
    telefono: '+51 912 678 901',
    canal: 'Tik Tok',
    sucursal: 'No físico',
    metodo: 'Yape',
    vendedor: 'Ana García',
    fecha: '2025-09-15',
    subtotal: 1400,
    descuento: 280,
    total: 1120,
    productos: [
      { id: 1, modelo: 'Nike Air Jordan', cantidad: 1, color: 'Negro', talla: '43', precioUnitario: 700, subtotal: 700 },
      { id: 2, modelo: 'Puma Future Rider', cantidad: 1, color: 'Gris', talla: '42', precioUnitario: 350, subtotal: 350 },
      { id: 3, modelo: 'Adidas NMD', cantidad: 1, color: 'Blanco', talla: '41', precioUnitario: 350, subtotal: 350 }
    ]
  },
  {
    id: '26366',
    cliente: 'Verónica',
    clienteFull: 'Verónica Ramírez Santos',
    doc: '11111111',
    dni: '11111111',
    telefono: '+51 923 789 456',
    canal: 'WhatsApp',
    sucursal: 'Lima Centro',
    metodo: 'Efectivo',
    vendedor: 'Luis Rodríguez',
    fecha: '2025-09-05',
    subtotal: 510,
    descuento: 0,
    total: 510,
    productos: [
      { id: 1, modelo: 'Vans Classic Slip-On', cantidad: 1, color: 'Negro', talla: '38', precioUnitario: 250, subtotal: 250 },
      { id: 2, modelo: 'Saucony Ride', cantidad: 1, color: 'Azul', talla: '40', precioUnitario: 260, subtotal: 260 }
    ]
  },
  // Agosto 2025
  {
    id: '26365',
    cliente: 'Diego',
    clienteFull: 'Diego Moreno Romero',
    doc: '77777776',
    dni: '77777776',
    telefono: '+51 934 567 890',
    canal: 'Instagram',
    sucursal: 'Lima Sur',
    metodo: 'Plin',
    vendedor: 'Juan Pérez',
    fecha: '2025-08-30',
    subtotal: 1050,
    descuento: 105,
    total: 945,
    productos: [
      { id: 1, modelo: 'New Balance 574', cantidad: 1, color: 'Gris', talla: '42', precioUnitario: 520, subtotal: 520 },
      { id: 2, modelo: 'Nike Revolution', cantidad: 1, color: 'Blanco', talla: '41', precioUnitario: 380, subtotal: 380 },
      { id: 3, modelo: 'Adidas Yeezy', cantidad: 1, color: 'Beige', talla: '43', precioUnitario: 150, subtotal: 150 }
    ]
  },
  {
    id: '26364',
    cliente: 'Lucía',
    clienteFull: 'Lucía Fernández Vega',
    doc: '88888887',
    dni: '88888887',
    telefono: '+51 945 234 567',
    canal: 'Facebook',
    sucursal: 'Lima Centro',
    metodo: 'Transferencia',
    vendedor: 'Ana García',
    fecha: '2025-08-18',
    subtotal: 675,
    descuento: 0,
    total: 675,
    productos: [
      { id: 1, modelo: 'Skechers Go Walk', cantidad: 2, color: 'Negro', talla: '36', precioUnitario: 337.5, subtotal: 675 }
    ]
  },
  {
    id: '26363',
    cliente: 'Alejandro',
    clienteFull: 'Alejandro Torres Gutiérrez',
    doc: '99999998',
    dni: '99999998',
    telefono: '+51 967 890 123',
    canal: 'Tienda Física',
    sucursal: 'Lima Sur',
    metodo: 'Efectivo',
    vendedor: 'Luis Rodríguez',
    fecha: '2025-08-10',
    subtotal: 820,
    descuento: 82,
    total: 738,
    productos: [
      { id: 1, modelo: 'Timberland 6-Inch', cantidad: 1, color: 'Marrón', talla: '43', precioUnitario: 650, subtotal: 650 },
      { id: 2, modelo: 'Nike SB Nyjah', cantidad: 1, color: 'Negro', talla: '42', precioUnitario: 170, subtotal: 170 }
    ]
  },
  // Julio 2025
  {
    id: '26362',
    cliente: 'Sofía',
    clienteFull: 'Sofía Cabrera Mendez',
    doc: '66666665',
    dni: '66666665',
    telefono: '+51 923 456 012',
    canal: 'Tik Tok',
    sucursal: 'No físico',
    metodo: 'Yape',
    vendedor: 'Juan Pérez',
    fecha: '2025-07-22',
    subtotal: 950,
    descuento: 190,
    total: 760,
    productos: [
      { id: 1, modelo: 'Adidas ZX 500', cantidad: 1, color: 'Azul', talla: '40', precioUnitario: 475, subtotal: 475 },
      { id: 2, modelo: 'Puma Suede', cantidad: 1, color: 'Rojo', talla: '39', precioUnitario: 475, subtotal: 475 }
    ]
  },
  {
    id: '26361',
    cliente: 'Martín',
    clienteFull: 'Martín Vázquez Romero',
    doc: '55555554',
    dni: '55555554',
    telefono: '+51 956 123 789',
    canal: 'Instagram',
    sucursal: 'Lima Centro',
    metodo: 'Plin',
    vendedor: 'Ana García',
    fecha: '2025-07-10',
    subtotal: 1200,
    descuento: 0,
    total: 1200,
    productos: [
      { id: 1, modelo: 'Nike Zoom Freak', cantidad: 1, color: 'Negro', talla: '41', precioUnitario: 650, subtotal: 650 },
      { id: 2, modelo: 'Adidas Crazy', cantidad: 1, color: 'Blanco', talla: '42', precioUnitario: 550, subtotal: 550 }
    ]
  },
];

// Datos de clientes para autocompletar
const clientesIniciales = [
  { dni: '73456789', nombre: 'María González Pérez', telefono: '+51 987 654 321' },
  { dni: '88888888', nombre: 'Carlos Mendoza López', telefono: '+51 912 345 678' },
  { dni: '99999999', nombre: 'Ana Torres Ruiz', telefono: '+51 945 678 123' },
  { dni: '66666666', nombre: 'Roberto Sánchez Flores', telefono: '+51 923 456 789' },
  { dni: '55555555', nombre: 'Patricia Díaz Morales', telefono: '+51 956 789 123' },
  { dni: '44444444', nombre: 'Miguel Quispe Mamani', telefono: '+51 987 123 456' },
  { dni: '33333333', nombre: 'Sandra López Gutierrez', telefono: '+51 945 123 789' },
  { dni: '22222222', nombre: 'Fernando Castillo Acuña', telefono: '+51 912 678 901' },
  { dni: '11111111', nombre: 'Verónica Ramírez Santos', telefono: '+51 923 789 456' },
  { dni: '77777776', nombre: 'Diego Moreno Romero', telefono: '+51 934 567 890' },
  { dni: '88888887', nombre: 'Lucía Fernández Vega', telefono: '+51 945 234 567' },
  { dni: '99999998', nombre: 'Alejandro Torres Gutiérrez', telefono: '+51 967 890 123' },
  { dni: '66666665', nombre: 'Sofía Cabrera Mendez', telefono: '+51 923 456 012' },
  { dni: '55555554', nombre: 'Martín Vázquez Romero', telefono: '+51 956 123 789' },
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
      cliente: datosVenta.nombreCliente.split(' ')[0],
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

  // Calcular ventas del mes
  const ventasDelMes = (mes, año) => {
    const formato = `${año}-${String(mes).padStart(2, '0')}`;
    return ventas
      .filter(v => v.fecha.startsWith(formato))
      .reduce((sum, v) => sum + v.total, 0);
  };

  // Obtener resumen por mes
  const resumenPorMes = () => {
    const resumen = {};
    ventas.forEach(venta => {
      const mes = venta.fecha.substring(0, 7);
      if (!resumen[mes]) {
        resumen[mes] = { total: 0, cantidad: 0 };
      }
      resumen[mes].total += venta.total;
      resumen[mes].cantidad += 1;
    });
    return resumen;
  };

  return (
    <VentasContext.Provider value={{
      ventas,
      clientes,
      registrarVenta,
      registrarDevolucion,
      buscarClientePorDni,
      ventasDelDia,
      ventasDelMes,
      resumenPorMes,
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