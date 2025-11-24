import { Button } from "../../../../globals/components/atomos/Button";

export const SaleTotal = ({ 
  subtotal = 0, 
  descuento = 0, 
  total = 0, 
  onDescuentoChange,
  onRegisterSaleClick, 
  onCancelClick 
}) => (
  <div className="bg-neutral-01 rounded-lg shadow-md p-6 mt-6 flex justify-between items-center">
    <div className="flex gap-4 items-center">
      <div title="Subtotal" className="text-sm">
        <span className="text-gray-500">Subtotal: </span>
        <span className="font-medium">S/. {subtotal.toFixed(2)}</span>
      </div>
      
      <div title="Descuento" className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Descuento:</span>
        <input
          type="number"
          value={descuento}
          onChange={(e) => onDescuentoChange(parseFloat(e.target.value) || 0)}
          className="w-20 border border-neutral-03 rounded px-2 py-1 text-sm"
          min="0"
        />
      </div>

      <div title="Total Venta" className="border border-primary-01 rounded-lg p-3">
        <span className="text-xl font-bold text-primary-01">Total: S/. {total.toFixed(2)}</span>
      </div>
    </div>
    <div className="flex space-x-4">
      <Button size="medium" variant="white" onClick={onCancelClick}>
        Cancelar
      </Button>
      <Button size="medium" variant="secondaryUNO" onClick={onRegisterSaleClick}>
        Registrar Venta
      </Button>
    </div>
  </div>
);
