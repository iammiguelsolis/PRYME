import { Button } from "../../../../globals/components/atomos/Button";

export const EntryTotal = ({ onRegisterSaleClick }) => (
  <div className="bg-neutral-01 rounded-lg shadow-md p-6 mt-6 flex justify-between items-center">
    <div className="border border-primary-01 rounded-lg p-3">
      <span className="text-xl font-bold text-primary-01">Total: S/.1,800.00</span>
    </div>
    <div className="flex space-x-4">
      <Button size="medium" variant="white">
        Cancelar
      </Button>
      <Button size="medium" variant="secondaryUNO" onClick={onRegisterSaleClick}>
        Registrar Ingreso
      </Button>
    </div>
  </div>
);