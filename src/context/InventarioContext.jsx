// ========================================
// 1. CREAR CONTEXTO: src/context/InventarioContext.jsx
// ========================================

import { createContext, useContext, useState } from 'react';

const InventarioContext = createContext();

// Datos iniciales extendidos
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
  { 
    sku: '50013', 
    producto: 'Nike Air Max 90', 
    color: 'Rojo', 
    talla: '43',
    stock: '18 unidades',
    costo: 'S/. 350.00',
    costoNumerico: 350,
    ultimoIngreso: '22 - 11 - 2025',
    proveedor: 'Nike Peru',
    costoProveedor: 'S/. 350.00',
    telefono: '+51 987 321 654',
    ingresosRelacionados: [
      { id: '23216', cantidad: 18, costo: '6,300.00' },
    ],
    stockActual: '18 unidades',
    ultimoCosto: 'S/.350.00'
  },
  { 
    sku: '44002', 
    producto: 'Adidas Superstar', 
    color: 'Blanco/Negro', 
    talla: '41',
    stock: '25 unidades',
    costo: 'S/. 260.00',
    costoNumerico: 260,
    ultimoIngreso: '21 - 11 - 2025',
    proveedor: 'Adidas Peru',
    costoProveedor: 'S/. 260.00',
    telefono: '+51 912 456 789',
    ingresosRelacionados: [
      { id: '23217', cantidad: 25, costo: '6,500.00' },
    ],
    stockActual: '25 unidades',
    ultimoCosto: 'S/.260.00'
  },
  { 
    sku: '50316', 
    producto: 'NB 574 Classic', 
    color: 'Azul', 
    talla: '40',
    stock: '12 unidades',
    costo: 'S/. 290.00',
    costoNumerico: 290,
    ultimoIngreso: '19 - 11 - 2025',
    proveedor: 'New Balance Peru',
    costoProveedor: 'S/. 290.00',
    telefono: '+51 945 678 123',
    ingresosRelacionados: [
      { id: '23218', cantidad: 12, costo: '3,480.00' },
    ],
    stockActual: '12 unidades',
    ultimoCosto: 'S/.290.00'
  },
  { 
    sku: '48935', 
    producto: 'Puma Suede Classic', 
    color: 'Verde', 
    talla: '42',
    stock: '20 unidades',
    costo: 'S/. 240.00',
    costoNumerico: 240,
    ultimoIngreso: '23 - 11 - 2025',
    proveedor: 'Puma Peru',
    costoProveedor: 'S/. 240.00',
    telefono: '+51 923 456 789',
    ingresosRelacionados: [
      { id: '23219', cantidad: 20, costo: '4,800.00' },
    ],
    stockActual: '20 unidades',
    ultimoCosto: 'S/.240.00'
  },
  { 
    sku: '50014', 
    producto: 'Nike Cortez', 
    color: 'Blanco/Rojo', 
    talla: '39',
    stock: '16 unidades',
    costo: 'S/. 230.00',
    costoNumerico: 230,
    ultimoIngreso: '17 - 11 - 2025',
    proveedor: 'Nike Peru',
    costoProveedor: 'S/. 230.00',
    telefono: '+51 987 321 654',
    ingresosRelacionados: [
      { id: '23220', cantidad: 16, costo: '3,680.00' },
    ],
    stockActual: '16 unidades',
    ultimoCosto: 'S/.230.00'
  },
  { 
    sku: '44003', 
    producto: 'Adidas Stan Smith', 
    color: 'Blanco/Verde', 
    talla: '41',
    stock: '28 unidades',
    costo: 'S/. 270.00',
    costoNumerico: 270,
    ultimoIngreso: '16 - 11 - 2025',
    proveedor: 'Adidas Peru',
    costoProveedor: 'S/. 270.00',
    telefono: '+51 912 456 789',
    ingresosRelacionados: [
      { id: '23221', cantidad: 28, costo: '7,560.00' },
    ],
    stockActual: '28 unidades',
    ultimoCosto: 'S/.270.00'
  },
  { 
    sku: '50317', 
    producto: 'NB 997H', 
    color: 'Negro/Rojo', 
    talla: '43',
    stock: '10 unidades',
    costo: 'S/. 340.00',
    costoNumerico: 340,
    ultimoIngreso: '15 - 11 - 2025',
    proveedor: 'New Balance Peru',
    costoProveedor: 'S/. 340.00',
    telefono: '+51 945 678 123',
    ingresosRelacionados: [
      { id: '23222', cantidad: 10, costo: '3,400.00' },
    ],
    stockActual: '10 unidades',
    ultimoCosto: 'S/.340.00'
  },
  { 
    sku: '48936', 
    producto: 'Puma RS-X', 
    color: 'Multicolor', 
    talla: '42',
    stock: '14 unidades',
    costo: 'S/. 310.00',
    costoNumerico: 310,
    ultimoIngreso: '14 - 11 - 2025',
    proveedor: 'Puma Peru',
    costoProveedor: 'S/. 310.00',
    telefono: '+51 923 456 789',
    ingresosRelacionados: [
      { id: '23223', cantidad: 14, costo: '4,340.00' },
    ],
    stockActual: '14 unidades',
    ultimoCosto: 'S/.310.00'
  },
  { 
    sku: '50015', 
    producto: 'Nike Blazer Mid', 
    color: 'Negro', 
    talla: '40',
    stock: '19 unidades',
    costo: 'S/. 280.00',
    costoNumerico: 280,
    ultimoIngreso: '13 - 11 - 2025',
    proveedor: 'Nike Peru',
    costoProveedor: 'S/. 280.00',
    telefono: '+51 987 321 654',
    ingresosRelacionados: [
      { id: '23224', cantidad: 19, costo: '5,320.00' },
    ],
    stockActual: '19 unidades',
    ultimoCosto: 'S/.280.00'
  },
  { 
    sku: '44004', 
    producto: 'Adidas Ultraboost', 
    color: 'Gris', 
    talla: '42',
    stock: '11 unidades',
    costo: 'S/. 380.00',
    costoNumerico: 380,
    ultimoIngreso: '12 - 11 - 2025',
    proveedor: 'Adidas Peru',
    costoProveedor: 'S/. 380.00',
    telefono: '+51 912 456 789',
    ingresosRelacionados: [
      { id: '23225', cantidad: 11, costo: '4,180.00' },
    ],
    stockActual: '11 unidades',
    ultimoCosto: 'S/.380.00'
  },
  { 
    sku: '50318', 
    producto: 'NB 990v5', 
    color: 'Gris/Azul', 
    talla: '41',
    stock: '9 unidades',
    costo: 'S/. 420.00',
    costoNumerico: 420,
    ultimoIngreso: '11 - 11 - 2025',
    proveedor: 'New Balance Peru',
    costoProveedor: 'S/. 420.00',
    telefono: '+51 945 678 123',
    ingresosRelacionados: [
      { id: '23226', cantidad: 9, costo: '3,780.00' },
    ],
    stockActual: '9 unidades',
    ultimoCosto: 'S/.420.00'
  },
  { 
    sku: '48937', 
    producto: 'Puma Cali Sport', 
    color: 'Blanco', 
    talla: '39',
    stock: '23 unidades',
    costo: 'S/. 250.00',
    costoNumerico: 250,
    ultimoIngreso: '10 - 11 - 2025',
    proveedor: 'Puma Peru',
    costoProveedor: 'S/. 250.00',
    telefono: '+51 923 456 789',
    ingresosRelacionados: [
      { id: '23227', cantidad: 23, costo: '5,750.00' },
    ],
    stockActual: '23 unidades',
    ultimoCosto: 'S/.250.00'
  },
  { 
    sku: '50016', 
    producto: 'Nike React Infinity', 
    color: 'Azul', 
    talla: '43',
    stock: '13 unidades',
    costo: 'S/. 360.00',
    costoNumerico: 360,
    ultimoIngreso: '09 - 11 - 2025',
    proveedor: 'Nike Peru',
    costoProveedor: 'S/. 360.00',
    telefono: '+51 987 321 654',
    ingresosRelacionados: [
      { id: '23228', cantidad: 13, costo: '4,680.00' },
    ],
    stockActual: '13 unidades',
    ultimoCosto: 'S/.360.00'
  },
  { 
    sku: '44005', 
    producto: 'Adidas Forum Low', 
    color: 'Blanco/Azul', 
    talla: '40',
    stock: '17 unidades',
    costo: 'S/. 290.00',
    costoNumerico: 290,
    ultimoIngreso: '08 - 11 - 2025',
    proveedor: 'Adidas Peru',
    costoProveedor: 'S/. 290.00',
    telefono: '+51 912 456 789',
    ingresosRelacionados: [
      { id: '23229', cantidad: 17, costo: '4,930.00' },
    ],
    stockActual: '17 unidades',
    ultimoCosto: 'S/.290.00'
  },
  { 
    sku: '50319', 
    producto: 'NB 327', 
    color: 'Beige', 
    talla: '42',
    stock: '21 unidades',
    costo: 'S/. 310.00',
    costoNumerico: 310,
    ultimoIngreso: '07 - 11 - 2025',
    proveedor: 'New Balance Peru',
    costoProveedor: 'S/. 310.00',
    telefono: '+51 945 678 123',
    ingresosRelacionados: [
      { id: '23230', cantidad: 21, costo: '6,510.00' },
    ],
    stockActual: '21 unidades',
    ultimoCosto: 'S/.310.00'
  },
  { 
    sku: '48938', 
    producto: 'Puma Future Rider', 
    color: 'Negro/Amarillo', 
    talla: '41',
    stock: '15 unidades',
    costo: 'S/. 270.00',
    costoNumerico: 270,
    ultimoIngreso: '06 - 11 - 2025',
    proveedor: 'Puma Peru',
    costoProveedor: 'S/. 270.00',
    telefono: '+51 923 456 789',
    ingresosRelacionados: [
      { id: '23231', cantidad: 15, costo: '4,050.00' },
    ],
    stockActual: '15 unidades',
    ultimoCosto: 'S/.270.00'
  },
];

const ingresosIniciales = [
  { id: '23214', proveedor: 'Adidas Peru', producto: 'Adidas Samba', cantidad: 16, fecha: '2025-11-20', tipo: 'compra', sucursal: 'lima', costoTotal: 4480 },
  { id: '23215', proveedor: 'Adidas Latam', producto: 'Ultraboost', cantidad: 30, fecha: '2025-11-19', tipo: 'compra', sucursal: 'lima', costoTotal: 9000 },
  { id: '23208', proveedor: 'Nike Peru', producto: 'Nike Air Force', cantidad: 25, fecha: '2025-11-18', tipo: 'compra', sucursal: 'lima', costoTotal: 5500 },
  { id: '23199', proveedor: 'Adidas Peru', producto: 'Campus', cantidad: 25, fecha: '2025-11-15', tipo: 'devolucion', sucursal: 'lima', costoTotal: 6250 },
  { id: '23216', proveedor: 'Nike Peru', producto: 'Nike Air Max 90', cantidad: 18, fecha: '2025-11-22', tipo: 'compra', sucursal: 'callao', costoTotal: 6300 },
  { id: '23217', proveedor: 'Adidas Peru', producto: 'Adidas Superstar', cantidad: 25, fecha: '2025-11-21', tipo: 'compra', sucursal: 'lima', costoTotal: 6500 },
  { id: '23218', proveedor: 'New Balance Peru', producto: 'NB 574 Classic', cantidad: 12, fecha: '2025-11-19', tipo: 'compra', sucursal: 'arequipa', costoTotal: 3480 },
  { id: '23219', proveedor: 'Puma Peru', producto: 'Puma Suede Classic', cantidad: 20, fecha: '2025-11-23', tipo: 'compra', sucursal: 'lima', costoTotal: 4800 },
  { id: '23220', proveedor: 'Nike Peru', producto: 'Nike Cortez', cantidad: 16, fecha: '2025-11-17', tipo: 'compra', sucursal: 'callao', costoTotal: 3680 },
  { id: '23221', proveedor: 'Adidas Peru', producto: 'Adidas Stan Smith', cantidad: 28, fecha: '2025-11-16', tipo: 'compra', sucursal: 'lima', costoTotal: 7560 },
  { id: '23222', proveedor: 'New Balance Peru', producto: 'NB 997H', cantidad: 10, fecha: '2025-11-15', tipo: 'compra', sucursal: 'arequipa', costoTotal: 3400 },
  { id: '23223', proveedor: 'Puma Peru', producto: 'Puma RS-X', cantidad: 14, fecha: '2025-11-14', tipo: 'compra', sucursal: 'lima', costoTotal: 4340 },
  { id: '23224', proveedor: 'Nike Peru', producto: 'Nike Blazer Mid', cantidad: 19, fecha: '2025-11-13', tipo: 'compra', sucursal: 'callao', costoTotal: 5320 },
  { id: '23225', proveedor: 'Adidas Peru', producto: 'Adidas Ultraboost', cantidad: 11, fecha: '2025-11-12', tipo: 'compra', sucursal: 'lima', costoTotal: 4180 },
  { id: '23226', proveedor: 'New Balance Peru', producto: 'NB 990v5', cantidad: 9, fecha: '2025-11-11', tipo: 'compra', sucursal: 'arequipa', costoTotal: 3780 },
  { id: '23227', proveedor: 'Puma Peru', producto: 'Puma Cali Sport', cantidad: 23, fecha: '2025-11-10', tipo: 'compra', sucursal: 'lima', costoTotal: 5750 },
  { id: '23228', proveedor: 'Nike Peru', producto: 'Nike React Infinity', cantidad: 13, fecha: '2025-11-09', tipo: 'compra', sucursal: 'callao', costoTotal: 4680 },
  { id: '23229', proveedor: 'Adidas Peru', producto: 'Adidas Forum Low', cantidad: 17, fecha: '2025-11-08', tipo: 'compra', sucursal: 'lima', costoTotal: 4930 },
  { id: '23230', proveedor: 'New Balance Peru', producto: 'NB 327', cantidad: 21, fecha: '2025-11-07', tipo: 'compra', sucursal: 'arequipa', costoTotal: 6510 },
  { id: '23231', proveedor: 'Puma Peru', producto: 'Puma Future Rider', cantidad: 15, fecha: '2025-11-06', tipo: 'compra', sucursal: 'lima', costoTotal: 4050 },
  { id: '23200', proveedor: 'Nike Peru', producto: 'Nike Dunk Low', cantidad: 12, fecha: '2025-11-05', tipo: 'devolucion', sucursal: 'callao', costoTotal: 3360 },
  { id: '23232', proveedor: 'Adidas Peru', producto: 'Adidas NMD R1', cantidad: 22, fecha: '2025-10-28', tipo: 'compra', sucursal: 'lima', costoTotal: 6600 },
  { id: '23233', proveedor: 'New Balance Peru', producto: 'NB Fresh Foam', cantidad: 18, fecha: '2025-10-25', tipo: 'compra', sucursal: 'arequipa', costoTotal: 5400 },
  { id: '23234', proveedor: 'Puma Peru', producto: 'Puma Clyde Court', cantidad: 14, fecha: '2025-10-22', tipo: 'compra', sucursal: 'lima', costoTotal: 4200 },
  { id: '23201', proveedor: 'Adidas Peru', producto: 'Adidas Yeezy Boost', cantidad: 8, fecha: '2025-10-20', tipo: 'devolucion', sucursal: 'lima', costoTotal: 4000 },
  { id: '23235', proveedor: 'Nike Peru', producto: 'Nike Pegasus 39', cantidad: 24, fecha: '2025-10-18', tipo: 'compra', sucursal: 'callao', costoTotal: 8160 },
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