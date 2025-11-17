import { Button } from "../../../../globals/components/atomos/Button";
import { SectionHeader } from "../moleculas/SectionHeader";
import { HiPlus, HiOutlineTrash  } from 'react-icons/hi2';

export const ProductList = ({ onAddProductClick }) => (
  <div className="bg-neutral-01 rounded-lg shadow-md p-6 mt-6 h-full flex flex-col">
    <div className="flex justify-between items-center mb-4 w-full">
      <div className="flex-1 mr-4">
        <SectionHeader title="Lista de Productos"  />
      </div>
      <Button 
        onClick={onAddProductClick} 
        size="medium" variant="secondaryUNO"
      >
        <HiPlus className="w-5 h-5 mr-2" />
        Añadir Producto
      </Button>
    </div>
    
    {/* Tabla de Productos */}
    <div className="overflow-auto flex-grow rounded-lg">
      <table className="w-full">
        <thead className="bg-primary-01 text-text-03">
          <tr>
            {["SKU / Codigo", "Modelo", "Color", "Talla", "Cantidad", "Subtotal (S/.)", "Detalle", "Accion"].map(h => (
              <th key={h} className="py-2 px-3 text-left font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-neutral-03 text-text-02">
            <td className="py-2 px-3">50001</td>
            <td className="py-2 px-3">Nike Dunk SB</td>
            <td className="py-2 px-3">Verde</td>
            <td className="py-2 px-3">42</td>
            <td className="py-2 px-3">1</td>
            <td className="py-2 px-3">559.99</td>
            <td className="py-2 px-3">
              <Button size="small" variant="white">Ver detalle</Button>
            </td>
            <td className="py-2 px-3">
              <Button size="small" variant="whiteRed">
                Borrar
                <HiOutlineTrash className="w-5 h-5" />
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);