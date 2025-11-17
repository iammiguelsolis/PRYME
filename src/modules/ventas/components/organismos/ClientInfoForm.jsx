import { FormField } from "../moleculas/FormField";
import { SectionHeader } from "../moleculas/SectionHeader";
import { SelectField } from "../moleculas/SelectField";

export const ClientInfoForm = () => (
  <div className="bg-neutral-01 rounded-lg shadow-md p-6">
    <SectionHeader title="Información del Cliente" />
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <div className="lg:col-span-2">
        <FormField label="Nombre" id="nombre" placeholder="Nombre" />
      </div>
      <div className="lg:col-span-1">
        <FormField label="Telefono" id="telefono" placeholder="Telefono" />
      </div>
      <div className="lg:col-span-1">
        <FormField label="Doc. Identidad" id="doc" placeholder="DNI / RUC" />
      </div>
      <div className="lg:col-span-2 grid grid-cols-3 gap-4">
        <SelectField label="Canal" id="canal">
          <option>Tik Tok</option><option>Web</option>
        </SelectField>
        <SelectField label="Sucursal" id="sucursal">
          <option>No físico</option><option>Lima Centro</option>
        </SelectField>
        <SelectField label="Metodo de Pago" id="pago">
          <option>Yape</option><option>Plin</option><option>Efectivo</option>
        </SelectField>
      </div>
    </div>
  </div>
);