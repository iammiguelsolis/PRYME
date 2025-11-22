import { FormField } from "../molecules/FormField";
import { SectionHeader } from "../molecules/SectionHeader";
import { SelectField } from "../molecules/SelectField";

export const EntryInfoForm = () => (
  <div className="bg-neutral-01 rounded-lg shadow-md p-6">
    <SectionHeader title="Datos del Ingreso" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-1">
        <FormField label="Proveedor" id="proveedor" placeholder="Selecciona Proveedor" />
      </div>
      <div className="lg:col-span-1">
        <SelectField label="Sucursal" id="sucursal">
          <option>No físico</option><option>Lima Centro</option>
        </SelectField>
      </div>
      <div className="lg:col-span-1">
        <FormField label="Fecha" id="doc" placeholder="XX - XX - 2025" />
      </div>
    </div>
  </div>
);