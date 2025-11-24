import { Button } from "../../../../globals/components/atomos/Button";
import { SectionHeader } from "../moleculas/SectionHeader";
import { HiPlus, HiOutlineTrash } from 'react-icons/hi2';

export const ProductList = ({ productos, onAddProductClick, onRemoveProduct }) => (
  <div className="bg-neutral-01 rounded-lg shadow-md p-6 mt-6 h-full flex flex-col">
    <div className="flex justify-between items-center mb-4 w-full">
      <div className="flex-1 mr-4">
        <SectionHeader title="Lista de Productos" />
      </div>
      <Button 
        onClick={onAddProductClick} 
        size="medium" 
        variant="secondaryUNO"
        icon={<HiPlus className="w-6 h-6"></HiPlus>}
      >
        Añadir Producto
      </Button>
    </div>
    
    <div className="overflow-auto flex-grow rounded-lg">
      <table className="w-full">
        <thead className="bg-primary-01 text-text-03">
          <tr>
            {["Modelo", "Color", "Talla", "Cantidad", "Precio Unit.", "Subtotal (S/.)", "Accion"].map(h => (
              <th key={h} className="py-2 px-3 text-center font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(!productos || productos.length === 0) ? (
            <tr>
              <td colSpan="7" className="py-8 text-center text-gray-400">
                No hay productos. Haz clic en "Añadir Producto" para comenzar.
              </td>
            </tr>
          ) : (
            productos.map((p) => (
              <tr key={p.id} className="border-b border-neutral-03 text-text-02 hover:bg-neutral-03">
                <td className="py-3 px-3 text-center">{p.modelo}</td>
                <td className="py-3 px-3 text-center">{p.color}</td>
                <td className="py-3 px-3 text-center">{p.talla}</td>
                <td className="py-3 px-3 text-center">{p.cantidad}</td>
                <td className="py-3 px-3 text-center">S/. {p.precioUnitario.toFixed(2)}</td>
                <td className="py-3 px-3 text-center">S/. {p.subtotal.toFixed(2)}</td>
                <td className="py-3 px-3 text-center">
                  <Button size="small" variant="whiteRed" onClick={() => onRemoveProduct(p.id)}>
                    Borrar
                    <HiOutlineTrash className="w-5 h-5" />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);
