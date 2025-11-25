import { useState } from 'react';
import { TutorialCard } from '../molecules/TutorialCard';
import { VideoTutorialModal } from './VideoTutorialModal';
import {
  HiOutlineShoppingBag,
  HiOutlineArchiveBox,
  HiOutlineChartBar,
  HiOutlineArrowPath
} from 'react-icons/hi2';

const tutorialsData = [
  {
    id: 'venta',
    icon: HiOutlineShoppingBag,
    title: 'Registrar una Venta',
    description: 'Aprende a registrar ventas paso a paso',
    color: 'bg-primary-01',
    steps: [
      'Ingresa datos del cliente',
      'Añade productos',
      'Aplica descuentos',
      'Confirma la venta'
    ],
    detailedSteps: [
      {
        title: 'Paso 1: Navega a Registrar Venta',
        description: 'Desde el menú lateral, haz clic en "Ventas" y luego en "Registrar Venta". También puedes usar el botón "Registrar Venta" en el dashboard de ventas.'
      },
      {
        title: 'Paso 2: Completa los datos del cliente',
        description: 'Ingresa el nombre del cliente, DNI, teléfono, selecciona el canal de venta (Tik Tok, Instagram, etc.), la sucursal y el método de pago. Si el cliente ya existe en el sistema, al ingresar su DNI se completarán automáticamente los demás datos.'
      },
      {
        title: 'Paso 3: Añade productos a la venta',
        description: 'Haz clic en "Añadir Producto". Selecciona el modelo, color, talla, ingresa la cantidad y el precio unitario. El sistema calculará automáticamente el subtotal. Puedes añadir múltiples productos repitiendo este proceso.'
      },
      {
        title: 'Paso 4: Aplica descuentos (opcional)',
        description: 'En la sección de totales, puedes ingresar un monto de descuento. El sistema te alertará si el descuento supera el 50% del subtotal para que lo verifiques.'
      },
      {
        title: 'Paso 5: Revisa y confirma',
        description: 'Verifica que toda la información sea correcta: productos, cantidades, precios y totales. Haz clic en "Registrar Venta" para completar el proceso. El sistema generará un ID único para la venta.'
      }
    ]
  },
  {
    id: 'ingreso',
    icon: HiOutlineArchiveBox,
    title: 'Registrar Ingreso de Inventario',
    description: 'Gestiona el ingreso de nuevos productos',
    color: 'bg-secondary-01',
    steps: [
      'Selecciona proveedor',
      'Añade productos al lote',
      'Revisa cantidades',
      'Registra el ingreso'
    ],
    detailedSteps: [
      {
        title: 'Paso 1: Accede a Registrar Ingreso',
        description: 'Desde el menú lateral, ve a "Inventario", luego a la pestaña "Ingresos" y haz clic en "Registrar Ingreso".'
      },
      {
        title: 'Paso 2: Completa datos del ingreso',
        description: 'Selecciona el proveedor del dropdown, elige la sucursal de destino y confirma la fecha del ingreso (por defecto es la fecha actual).'
      },
      {
        title: 'Paso 3: Añade productos al lote',
        description: 'Haz clic en "Añadir Producto". Selecciona el modelo, color, talla, ingresa la cantidad de unidades y el costo unitario. El sistema calculará automáticamente el subtotal. Repite para cada producto del lote.'
      },
      {
        title: 'Paso 4: Revisa el resumen',
        description: 'En la parte inferior verás el total de unidades y el costo total del ingreso. Verifica que toda la información sea correcta antes de continuar.'
      },
      {
        title: 'Paso 5: Registra el ingreso',
        description: 'Haz clic en "Registrar Ingreso". El sistema actualizará automáticamente el inventario: sumará las unidades al stock existente o creará nuevos productos si no existían. Se generará un ID único para el ingreso.'
      }
    ]
  },
  {
    id: 'devolucion',
    icon: HiOutlineArrowPath,
    title: 'Procesar una Devolución',
    description: 'Gestiona devoluciones de productos',
    color: 'bg-complementary-01',
    steps: [
      'Busca la venta original',
      'Selecciona productos',
      'Confirma devolución',
      'Actualiza inventario'
    ],
    detailedSteps: [
      {
        title: 'Paso 1: Localiza la venta',
        description: 'En la sección Ventas, usa los filtros para encontrar la venta que deseas procesar. Puedes buscar por ID de venta, nombre del cliente o DNI.'
      },
      {
        title: 'Paso 2: Abre el modal de devolución',
        description: 'Haz clic en el botón "Devolución" de la venta correspondiente. Se abrirá un modal mostrando todos los productos de esa venta.'
      },
      {
        title: 'Paso 3: Selecciona productos a devolver',
        description: 'Marca los checkboxes de los productos que el cliente está devolviendo. Puedes seleccionar uno o varios productos de la misma venta.'
      },
      {
        title: 'Paso 4: Confirma la devolución',
        description: 'Haz clic en el botón "Devolver". El sistema actualizará automáticamente el total de la venta original y registrará la devolución.'
      },
      {
        title: 'Paso 5: Verificación',
        description: 'El inventario se actualizará automáticamente sumando las unidades devueltas. Puedes verificar el cambio en la sección de Inventario o en los reportes.'
      }
    ]
  },
  {
    id: 'reportes',
    icon: HiOutlineChartBar,
    title: 'Generar y Exportar Reportes',
    description: 'Crea reportes personalizados',
    color: 'bg-state-01',
    steps: [
      'Accede a Reportes',
      'Revisa los gráficos',
      'Selecciona datos a exportar',
      'Descarga el reporte'
    ],
    detailedSteps: [
      {
        title: 'Paso 1: Navega a Reportes',
        description: 'Desde el menú lateral, haz clic en "Reportes". Verás un dashboard completo con diferentes indicadores y gráficos.'
      },
      {
        title: 'Paso 2: Interpreta los KPIs',
        description: 'En la parte superior encontrarás 4 indicadores clave: Ingresos Totales, Número de Ventas, Productos Vendidos y Devoluciones. Cada uno muestra el valor actual y su cambio porcentual.'
      },
      {
        title: 'Paso 3: Analiza los gráficos',
        description: 'Los gráficos muestran: ventas por mes, productos vendidos, distribución por sucursal y por canal. Haz hover sobre cualquier elemento para ver detalles específicos.'
      },
      {
        title: 'Paso 4: Exporta el reporte',
        description: 'Haz clic en el botón "Exportar". Selecciona el formato (PDF o Excel), marca qué información incluir (Ventas, Inventario, Devoluciones) y opcionalmente filtra por mes.'
      },
      {
        title: 'Paso 5: Descarga y comparte',
        description: 'El sistema generará el archivo con toda la información seleccionada. Podrás descargarlo y compartirlo con tu equipo o utilizarlo para análisis posteriores.'
      }
    ]
  }
];

export const TutorialsList = () => {
  const [selectedTutorial, setSelectedTutorial] = useState(null);

  return (
    <>
      <div className="bg-neutral-01 rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-text-01 mb-2">Tutoriales Paso a Paso</h2>
        <p className="text-text-02 mb-6">
          Aprende a usar todas las funcionalidades del sistema con nuestras guías detalladas
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tutorialsData.map(tutorial => (
            <TutorialCard
              key={tutorial.id}
              {...tutorial}
              onOpen={() => setSelectedTutorial(tutorial)}
            />
          ))}
        </div>
      </div>

      <VideoTutorialModal
        isOpen={!!selectedTutorial}
        onClose={() => setSelectedTutorial(null)}
        tutorial={selectedTutorial}
      />
    </>
  );
};