import { Button } from '../../../../globals/components/atomos/Button';
import { FormField } from '../molecules/FormField';
import { Modal } from '../molecules/Modal';
import { SectionHeader } from '../molecules/SectionHeader';
import { SelectField } from '../molecules/SelectField';
import FOTO from '../../../../assets/images/3d_avatar_21.png';

export const AddProductModal = ({ isOpen, onClose, onAdd }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <SectionHeader title="Añadir Producto" />

      <div className="grid grid-cols-2 gap-6">
        {/* Columna Izquierda: Formulario */}
        <div className="flex flex-col space-y-4">
          {/* Aquí iría el SearchInput */}
          <FormField label="Seleccionar Modelo" id="search" placeholder="Buscar Modelo" />

          <FormField label="Cantidad" id="cantidad" placeholder="Cantidad" type="number" />
          <SelectField label="Color" id="color">
            <option>Rojo</option><option>Verde</option><option>Azul</option>
          </SelectField>
          <SelectField label="Talla" id="talla">
            <option>42</option><option>43</option><option>44</option>
          </SelectField>
          <SelectField label="Sucursal Origen" id="origen">
            <option>Lima Centro</option><option>Almacén</option>
          </SelectField>
        </div>

        {/* Columna Derecha: Imagen */}
        <div className="flex items-center justify-center">
          <img
            src={FOTO}
            alt="Avatar"
            className="w-48 h-48 rounded-full bg-blue-200 object-cover"
          />
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex justify-end space-x-4 mt-8">
        <Button size="medium" variant="secondaryUNO" onClick={onAdd}>
          Añadir Producto
        </Button>
        <Button size="medium" variant="white" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </Modal>
  );
};