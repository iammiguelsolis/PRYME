// ========================================
// 1. CREAR CONTEXTO: src/context/InventarioContext.jsx
// ========================================

import { createContext, useContext, useState } from 'react';

const InventarioContext = createContext();

// Datos iniciales
const productosIniciales = [
  { 
    sku: '50012', 
    producto: 'Nike Air Force', 
    color: 'Verde', 
    talla: '42',
    stock: '15 unidades',
    costo: 'S/. 220.00',
    costoNumerico: 220,
    ultimoIngreso: '18 - 11 - 2025',
    proveedor: 'Nike Peru',
    costoProveedor: 'S/. 220.00',
    telefono: '+51 987 321 654',
    ingresosRelacionados: [
      { id: '23208', cantidad: 10, costo: '2,200.00' },
    ],
    stockActual: '15 unidades',
    ultimoCosto: 'S/.220.00'
  },
  { 
    sku: '44001', 
    producto: 'Adidas Samba', 
    color: 'Blanco', 
    talla: '40',
    stock: '22 unidades',
    costo: 'S/. 280.00',
    costoNumerico: 280,
    ultimoIngreso: '12 - 11 - 2025',
    proveedor: 'Adidas Peru',
    costoProveedor: 'S/. 280.00',
    telefono: '+51 912 456 789',
    ingresosRelacionados: [
      { id: '23214', cantidad: 12, costo: '3,360.00' },
    ],
    stockActual: '22 unidades',
    ultimoCosto: 'S/.280.00'
  },
  { 
    sku: '50315', 
    producto: 'NB 560 Grey', 
    color: 'Gris', 
    talla: '41',
    stock: '8 unidades',
    costo: 'S/. 320.00',
    costoNumerico: 320,
    ultimoIngreso: '10 - 11 - 2025',
    proveedor: 'New Balance Peru',
    costoProveedor: 'S/. 320.00',
    telefono: '+51 945 678 123',
    ingresosRelacionados: [],
    stockActual: '8 unidades',
    ultimoCosto: 'S/.320.00'
  },
  { 
    sku: '48934', 
    producto: 'Adidas Gazelle', 
    color: 'Negro', 
    talla: '39',
    stock: '30 unidades',
    costo: 'S/. 250.00',
    costoNumerico: 250,
    ultimoIngreso: '20 - 11 - 2025',
    proveedor: 'Adidas Peru',
    costoProveedor: 'S/. 250.00',
    telefono: '+51 912 456 789',
    ingresosRelacionados: [],
    stockActual: '30 unidades',
    ultimoCosto: 'S/.250.00'
  },
];

const ingresosIniciales = [
  { id: '23214', proveedor: 'Adidas Peru', producto: 'Adidas Samba', cantidad: 16, fecha: '2025-11-20', tipo: 'compra', sucursal: 'lima', costoTotal: 4480 },
  { id: '23215', proveedor: 'Adidas Latam', producto: 'Ultraboost', cantidad: 30, fecha: '2025-11-19', tipo: 'compra', sucursal: 'lima', costoTotal: 9000 },
  { id: '23208', proveedor: 'Nike Peru', producto: 'Nike Air Force', cantidad: 25, fecha: '2025-11-18', tipo: 'compra', sucursal: 'lima', costoTotal: 5500 },
  { id: '23199', proveedor: 'Adidas Peru', producto: 'Campus', cantidad: 25, fecha: '2025-11-15', tipo: 'devolucion', sucursal: 'lima', costoTotal: 6250 },
];

export const InventarioProvider = ({ children }) => {
  const [productos, setProductos] = useState(productosIniciales);
  const [ingresos, setIngresos] = useState(ingresosIniciales);

  // Generar nuevo ID de ingreso
  const generarIdIngreso = () => {
    const maxId = Math.max(...ingresos.map(i => parseInt(i.id)));
    return String(maxId + 1);
  };

  // Generar nuevo SKU
  const generarSku = () => {
    const maxSku = Math.max(...productos.map(p => parseInt(p.sku)));
    return String(maxSku + 1);
  };

  // Registrar nuevo ingreso con sus productos
  const registrarIngreso = (datosIngreso) => {
    const nuevoId = generarIdIngreso();
    const fechaHoy = new Date().toISOString().split('T')[0];
    const fechaFormateada = new Date().toLocaleDateString('es-PE', { 
      day: '2-digit', month: '2-digit', year: 'numeric' 
    }).replace(/\//g, ' - ');

    // Crear el nuevo ingreso
    const nuevoIngreso = {
      id: nuevoId,
      proveedor: datosIngreso.proveedor,
      producto: datosIngreso.lotes[0]?.modelo || 'Varios',
      cantidad: datosIngreso.lotes.reduce((sum, l) => sum + l.cantidad, 0),
      fecha: fechaHoy,
      tipo: datosIngreso.tipo || 'compra',
      sucursal: datosIngreso.sucursal || 'lima',
      costoTotal: datosIngreso.lotes.reduce((sum, l) => sum + (l.cantidad * l.costoUnitario), 0),
      lotes: datosIngreso.lotes
    };

    setIngresos(prev => [nuevoIngreso, ...prev]);

    // Actualizar o crear productos
    datosIngreso.lotes.forEach(lote => {
      const productoExistente = productos.find(
        p => p.producto.toLowerCase() === lote.modelo.toLowerCase() && 
             p.talla === lote.talla && 
             p.color.toLowerCase() === lote.color.toLowerCase()
      );

      if (productoExistente) {
        // Actualizar stock del producto existente
        setProductos(prev => prev.map(p => {
          if (p.sku === productoExistente.sku) {
            const nuevoStock = parseInt(p.stock) + lote.cantidad;
            return {
              ...p,
              stock: `${nuevoStock} unidades`,
              stockActual: `${nuevoStock} unidades`,
              ultimoIngreso: fechaFormateada,
              costo: `S/. ${lote.costoUnitario.toFixed(2)}`,
              ultimoCosto: `S/. ${lote.costoUnitario.toFixed(2)}`,
              costoNumerico: lote.costoUnitario,
              ingresosRelacionados: [
                ...p.ingresosRelacionados,
                { id: nuevoId, cantidad: lote.cantidad, costo: (lote.cantidad * lote.costoUnitario).toLocaleString() }
              ]
            };
          }
          return p;
        }));
      } else {
        // Crear nuevo producto
        const nuevoProducto = {
          sku: generarSku(),
          producto: lote.modelo,
          color: lote.color,
          talla: lote.talla,
          stock: `${lote.cantidad} unidades`,
          costo: `S/. ${lote.costoUnitario.toFixed(2)}`,
          costoNumerico: lote.costoUnitario,
          ultimoIngreso: fechaFormateada,
          proveedor: datosIngreso.proveedor,
          costoProveedor: `S/. ${lote.costoUnitario.toFixed(2)}`,
          telefono: datosIngreso.telefono || '+51 999 999 999',
          ingresosRelacionados: [
            { id: nuevoId, cantidad: lote.cantidad, costo: (lote.cantidad * lote.costoUnitario).toLocaleString() }
          ],
          stockActual: `${lote.cantidad} unidades`,
          ultimoCosto: `S/. ${lote.costoUnitario.toFixed(2)}`
        };
        setProductos(prev => [nuevoProducto, ...prev]);
      }
    });

    return nuevoId;
  };

  return (
    <InventarioContext.Provider value={{
      productos,
      ingresos,
      registrarIngreso,
      setProductos,
      setIngresos
    }}>
      {children}
    </InventarioContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useInventario = () => {
  const context = useContext(InventarioContext);
  if (!context) {
    throw new Error('useInventario debe usarse dentro de InventarioProvider');
  }
  return context;
};