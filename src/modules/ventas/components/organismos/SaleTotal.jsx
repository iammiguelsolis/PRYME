import { Button } from "../../../../globals/components/atomos/Button";

export const SaleTotal = ({ 
  subtotal = 0, 
  descuento = 0, 
  total = 0, 
  onDescuentoChange,
  onRegisterSaleClick, 
  onCancelClick 
}) => {

  const handleDescuentoChange = (e) => {
    const raw = parseFloat(e.target.value);

    if (Number.isNaN(raw)) {
      onDescuentoChange(0);
      return;
    }

    // Clamp: 0 <= descuento <= subtotal
    const clamped = Math.max(0, Math.min(raw, subtotal));
    onDescuentoChange(clamped);
  };

  const descuentoAlto = subtotal > 0 && descuento / subtotal > 0.5;

  return (
    <div className="bg-neutral-01 rounded-lg shadow-md p-6 mt-6 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <div title="Subtotal" className="text-sm">
          <p className="text-text-02">Subtotal</p>
          <p className="text-lg font-bold text-text-01">
            S/. {subtotal.toFixed(2)}
          </p>
        </div>

        <div title="Descuento" className="text-sm">
          <p className="text-text-02">Descuento</p>
          <input
            type="number"
            min={0}
            max={subtotal}
            value={descuento}
            onChange={handleDescuentoChange}
            className="w-full border border-neutral-03 rounded-lg px-3 py-1 text-sm text-text-02 focus:outline-none focus:ring-2 focus:ring-primary-01"
          />
          {descuentoAlto && (
            <p className="mt-1 text-xs text-[#B91C1C]">
              Estás aplicando un descuento mayor al 50% del subtotal. Verifica si es correcto.
            </p>
          )}
        </div>

        <div title="Total" className="text-sm">
          <p className="text-text-02">Total</p>
          <p className="text-xl font-bold text-primary-01">
            S/. {total.toFixed(2)}
          </p>
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
};
