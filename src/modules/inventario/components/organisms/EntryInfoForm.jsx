import { FormField } from "../molecules/FormField";
import { SectionHeader } from "../molecules/SectionHeader";
import { SelectField } from "../molecules/SelectField";

export const EntryInfoForm = ({ datos, onChange }) => {
  
  const handleChange = (field, value) => {
    onChange({ ...datos, [field]: value });
  };

  return (
    <div className="bg-neutral-01 rounded-lg shadow-md p-6">
      <SectionHeader title="Datos del Ingreso" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <SelectField 
            label="Proveedor" 
            id="proveedor"
            value={datos.proveedor}
            onChange={(e) => handleChange('proveedor', e.target.value)}
          >
            <option value="">Selecciona Proveedor</option>
            <option value="Nike Peru">Nike Peru</option>
            <option value="Adidas Peru">Adidas Peru</option>
            <option value="Adidas Latam">Adidas Latam</option>
            <option value="New Balance Peru">New Balance Peru</option>
          </SelectField>
        </div>
        <div className="lg:col-span-1">
          <SelectField 
            label="Sucursal" 
            id="sucursal"
            value={datos.sucursal}
            onChange={(e) => handleChange('sucursal', e.target.value)}
          >
            <option value="lima">Lima Centro</option>
            <option value="online">No físico</option>
          </SelectField>
        </div>
        <div className="lg:col-span-1">
          <FormField 
            label="Fecha" 
            id="fecha" 
            type="date"
            value={datos.fecha}
            onChange={(e) => handleChange('fecha', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};