import { FormField } from "../moleculas/FormField";
import { SectionHeader } from "../moleculas/SectionHeader";
import { SelectField } from "../moleculas/SelectField";

export const ClientInfoForm = ({ datos, onChange, onDniChange }) => {
  
  const handleChange = (field, value) => {
    if (field === 'dni' && onDniChange) {
      onDniChange(value);
    } else {
      onChange({ ...datos, [field]: value });
    }
  };

  return (
    <div className="bg-neutral-01 rounded-lg shadow-md p-6">
      <SectionHeader title="Información del Cliente" />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="lg:col-span-2">
          <FormField 
            label="Nombre" 
            id="nombre" 
            placeholder="Nombre del cliente"
            value={datos.nombreCliente}
            onChange={(e) => handleChange('nombreCliente', e.target.value)}
          />
        </div>
        <div className="lg:col-span-1">
          <FormField 
            label="Telefono" 
            id="telefono" 
            placeholder="+51 999 999 999"
            value={datos.telefono}
            onChange={(e) => handleChange('telefono', e.target.value)}
          />
        </div>
        <div className="lg:col-span-1">
          <FormField 
            label="Doc. Identidad" 
            id="dni" 
            placeholder="DNI / RUC"
            value={datos.dni}
            onChange={(e) => handleChange('dni', e.target.value)}
          />
        </div>
        <div className="lg:col-span-2 grid grid-cols-3 gap-4">
          <SelectField 
            label="Canal" 
            id="canal"
            value={datos.canal}
            onChange={(e) => handleChange('canal', e.target.value)}
          >
            <option value="">Seleccione</option>
            <option value="Tik Tok">Tik Tok</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Web">Web</option>
          </SelectField>
          <SelectField 
            label="Sucursal" 
            id="sucursal"
            value={datos.sucursal}
            onChange={(e) => handleChange('sucursal', e.target.value)}
          >
            <option value="nofisico">No físico</option>
            <option value="lima">Lima Centro</option>
          </SelectField>
          <SelectField 
            label="Metodo de Pago" 
            id="metodoPago"
            value={datos.metodoPago}
            onChange={(e) => handleChange('metodoPago', e.target.value)}
          >
            <option value="">Seleccione</option>
            <option value="Yape">Yape</option>
            <option value="Plin">Plin</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta">Tarjeta</option>
          </SelectField>
        </div>
      </div>
    </div>
  );
};