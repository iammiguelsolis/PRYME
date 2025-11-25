import { Button } from "../../../../globals/components/atomos/Button";
import { SectionHeader } from "../molecules/SectionHeader";
import { HiPlus, HiOutlineTrash } from "react-icons/hi2";

export const BatchList = ({ lotes, onAddProductClick, onRemoveProduct }) => {

  return (
    <div className="bg-neutral-01 rounded-lg shadow-md p-6 mt-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 w-full">
        <div className="flex-1 mr-4">
          <SectionHeader title="Items del Lote" />
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

      {/* Table */}
      <div className="overflow-auto grow rounded-lg">
        <table className="w-full">
          <thead className="bg-primary-01 text-text-03">
            <tr>
              {[
                "Producto",
                "Color",
                "Talla",
                "Cantidad",
                "Costo Unitario(S/.)",
                "Subtotal (S/.)",
                "Acciones",
              ].map((h) => (
                <th
                  key={h}
                  className="py-3 px-3 text-center align-middle font-semibold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {lotes.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-gray-400">
                  No hay productos agregados. Haz clic en "Añadir Producto" para comenzar.
                </td>
              </tr>
            ) : (
              lotes.map((lote) => (
                <tr
                  key={lote.id}
                  className="border-b border-neutral-03 text-text-02 hover:bg-neutral-03 transition"
                >
                  <td className="py-3 px-3 text-center">{lote.modelo}</td>
                  <td className="py-3 px-3 text-center">{lote.color}</td>
                  <td className="py-3 px-3 text-center">{lote.talla}</td>
                  <td className="py-3 px-3 text-center">{lote.cantidad}</td>
                  <td className="py-3 px-3 text-center">S/. {lote.costoUnitario.toFixed(2)}</td>
                  <td className="py-3 px-3 text-center">S/. {(lote.cantidad * lote.costoUnitario).toFixed(2)}</td>
                  <td className="py-3 px-3 flex items-center justify-center gap-2">
                    
                    <Button
                      size="small"
                      variant="whiteRed"
                      icon={<HiOutlineTrash className="w-5 h-5"></HiOutlineTrash>}
                      onClick={() => onRemoveProduct(lote.id)}
                    >
                      Eliminar
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
};