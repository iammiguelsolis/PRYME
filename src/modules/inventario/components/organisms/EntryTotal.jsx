import { Button } from "../../../../globals/components/atomos/Button";

export const EntryTotal = ({ totalUnidades, totalCosto, onRegisterSaleClick, onCancelClick }) => (
  <div className="bg-neutral-01 rounded-lg shadow-md p-6 mt-6 flex justify-between items-center">
    <div className="flex gap-6">
      <div title="Total Unidades" className="border border-primary-01 rounded-lg p-3">
        <span className="text-lg font-bold text-primary-01">
          Unidades: {totalUnidades || 0}
        </span>
      </div>
      <div title="Total Costo" className="border border-primary-01 rounded-lg p-3">
        <span className="text-xl font-bold text-primary-01">
          Total: S/. {(totalCosto || 0).toFixed(2)}
        </span>
      </div>
    </div>
    <div className="flex space-x-4">
      <Button size="medium" variant="white" onClick={onCancelClick}>
        Cancelar
      </Button>
      <Button size="medium" variant="secondaryUNO" onClick={onRegisterSaleClick}>
        Registrar Ingreso
      </Button>
    </div>  
  </div>
);