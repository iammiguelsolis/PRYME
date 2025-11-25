import { useState, useMemo } from 'react';
import { FAQItem } from '../molecules/FAQItem';
import { SearchInput } from '../atoms/SearchInput';
import { 
  HiOutlineShoppingBag, 
  HiOutlineArchiveBox, 
  HiOutlineChartBar,
  HiOutlineCog
} from 'react-icons/hi2';

const faqData = [
  {
    category: 'Ventas',
    icon: HiOutlineShoppingBag,
    questions: [
      {
        question: '¿Cómo registro una nueva venta?',
        answer: 'Para registrar una venta, ve a Ventas > Registrar Venta. Completa la información del cliente (nombre, DNI, teléfono), selecciona el canal de venta y método de pago. Luego, haz clic en "Añadir Producto" para agregar los productos vendidos. Finalmente, revisa el total y haz clic en "Registrar Venta".'
      },
      {
        question: '¿Puedo aplicar descuentos en las ventas?',
        answer: 'Sí, en la sección de totales al registrar una venta, puedes ingresar un monto de descuento. El sistema calculará automáticamente el total final restando el descuento del subtotal. El sistema te alertará si aplicas un descuento mayor al 50% del subtotal.'
      },
      {
        question: '¿Cómo realizo una devolución?',
        answer: 'Ve a la sección Ventas, busca la venta correspondiente y haz clic en "Devolución". Selecciona los productos que deseas devolver marcando los checkboxes correspondientes y confirma la devolución. El inventario se actualizará automáticamente.'
      },
      {
        question: '¿Puedo ver el historial de ventas de un cliente?',
        answer: 'Sí, utiliza los filtros en la sección Ventas para buscar por nombre del cliente o DNI. El sistema mostrará todas las ventas realizadas a ese cliente. También puedes filtrar por fecha, canal, sucursal y método de pago.'
      }
    ]
  },
  {
    category: 'Inventario',
    icon: HiOutlineArchiveBox,
    questions: [
      {
        question: '¿Cómo registro un ingreso de productos?',
        answer: 'Ve a Inventario > Ingresos > Registrar Ingreso. Selecciona el proveedor, la sucursal y la fecha. Luego haz clic en "Añadir Producto" para agregar cada producto con su cantidad, color, talla y costo unitario. Finalmente, revisa los totales y registra el ingreso.'
      },
      {
        question: '¿Qué pasa si ingreso un producto que ya existe?',
        answer: 'El sistema detectará automáticamente si el producto ya existe (mismo modelo, color y talla) y actualizará su stock sumando las nuevas unidades. También actualizará el costo unitario y la información del último ingreso.'
      },
      {
        question: '¿Cómo busco un producto específico?',
        answer: 'En la sección Inventario, utiliza los filtros de búsqueda para filtrar por modelo, color, talla y sucursal. También puedes hacer clic en cualquier columna de la tabla para ordenar los resultados.'
      },
      {
        question: '¿Puedo ver el historial de ingresos de un producto?',
        answer: 'Sí, haz clic en "Ver detalle" de cualquier producto. En el modal verás una tabla con todos los ingresos relacionados, incluyendo el ID del ingreso, cantidad y costo total de cada uno.'
      }
    ]
  },
  {
    category: 'Reportes',
    icon: HiOutlineChartBar,
    questions: [
      {
        question: '¿Qué información muestran los reportes?',
        answer: 'Los reportes muestran indicadores clave como ingresos totales, número de ventas, productos vendidos y devoluciones. También incluyen gráficos de ventas por mes, productos más vendidos, distribución por sucursal y canal de venta.'
      },
      {
        question: '¿Puedo exportar los reportes?',
        answer: 'Sí, haz clic en el botón "Exportar" en la sección Reportes. Puedes seleccionar el formato (PDF o Excel), qué información exportar (Ventas, Inventario, Devoluciones) y filtrar por mes específico.'
      },
      {
        question: '¿Cómo interpreto los gráficos?',
        answer: 'Los gráficos de barras muestran tendencias en el tiempo. El gráfico circular muestra distribuciones porcentuales. Puedes hacer hover sobre cualquier elemento para ver detalles específicos. Los colores se mantienen consistentes: azul para ventas, verde para productos.'
      }
    ]
  },
  {
    category: 'Sistema',
    icon: HiOutlineCog,
    questions: [
      {
        question: '¿Cómo actualizo mi información de perfil?',
        answer: 'Ve a Mi Perfil desde el menú lateral. Haz clic en "Editar" y modifica los campos necesarios (nombre, apellido, teléfono, etc.). Guarda los cambios haciendo clic en "Guardar cambios".'
      },
      {
        question: '¿Puedo cambiar mi contraseña?',
        answer: 'Sí, en la sección de Seguridad dentro de Mi Perfil, ingresa tu contraseña actual, la nueva contraseña y confírmala. Haz clic en "Actualizar contraseña" para guardar los cambios.'
      },
      {
        question: '¿Los filtros se mantienen al cambiar de página?',
        answer: 'No, los filtros se resetean al navegar a otra sección. Sin embargo, puedes ver qué filtros están activos mediante los "chips" de filtros que aparecen debajo de los campos de búsqueda.'
      },
      {
        question: '¿Cómo ordeno la información en las tablas?',
        answer: 'Haz clic en cualquier encabezado de columna para ordenar. El primer clic ordena ascendente, el segundo descendente. Las flechas indican la dirección del ordenamiento actual.'
      }
    ]
  }
];

export const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', ...faqData.map(cat => cat.category)];

  const filteredFAQs = useMemo(() => {
    let filtered = faqData;

    // Filtrar por categoría
    if (selectedCategory !== 'Todos') {
      filtered = faqData.filter(cat => cat.category === selectedCategory);
    }

    // Filtrar por búsqueda
    if (searchTerm.trim()) {
      filtered = filtered.map(category => ({
        ...category,
        questions: category.questions.filter(q => 
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(cat => cat.questions.length > 0);
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="bg-neutral-01 rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-text-01 mb-4">Preguntas Frecuentes</h2>
        
        <div className="space-y-4 mb-6">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Busca tu pregunta..."
          />

          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-01 text-white'
                    : 'bg-neutral-03 text-text-02 hover:bg-neutral-02'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredFAQs.length > 0 ? (
          <div className="space-y-6">
            {filteredFAQs.map(category => (
              <div key={category.category}>
                <div className="flex items-center gap-3 mb-4">
                  <category.icon className="w-6 h-6 text-primary-01" />
                  <h3 className="text-xl font-bold text-text-01">{category.category}</h3>
                </div>
                <div className="space-y-3">
                  {category.questions.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-02">No se encontraron preguntas que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
};