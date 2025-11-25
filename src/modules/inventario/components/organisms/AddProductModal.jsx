import { useState } from 'react';
import { Button } from '../../../../globals/components/atomos/Button';
import { FormField } from '../molecules/FormField';
import { Modal } from '../molecules/Modal';
import { SectionHeader } from '../molecules/SectionHeader';
import { SelectField } from '../molecules/SelectField';
import FOTO from '../../../../assets/images/3d_avatar_21.png';

export const AddProductModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    modelo: '',
    cantidad: '',
    color: '',
    talla: '',
    costoUnitario: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validaciones de campos vacíos
    if (
      !formData.modelo ||
      !formData.cantidad ||
      !formData.color ||
      !formData.talla ||
      !formData.costoUnitario
    ) {
      return;
    }

    const cantidadNum = Number(formData.cantidad);
    const costoNum = Number(formData.costoUnitario);

    // Validación lógica adicional
    if (Number.isNaN(cantidadNum) || cantidadNum <= 0) {
      return;
    }

    if (Number.isNaN(costoNum) || costoNum < 0) {
      return;
    }

    onAdd({
      modelo: formData.modelo,
      color: formData.color,
      talla: formData.talla,
      cantidad: cantidadNum,
      costoUnitario: costoNum,
    });

    // Limpiar form (pero NO cerrar el modal, eso lo manejas afuera si quieres)
    setFormData({
      modelo: '',
      cantidad: '',
      color: '',
      talla: '',
      costoUnitario: '',
    });
  };

  const handleClose = () => {
    setFormData({
      modelo: '',
      cantidad: '',
      color: '',
      talla: '',
      costoUnitario: '',
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <SectionHeader title="Añadir Producto" />

      <div className="grid grid-cols-2 gap-6">
        {/* Columna Izquierda: Formulario */}
        <div className="flex flex-col space-y-4">
          <SelectField 
            label="Seleccionar Modelo" 
            id="modelo"
            value={formData.modelo}
            onChange={(e) => handleChange('modelo', e.target.value)}
          >
            <option value="">Seleccione modelo</option>
            <option value="Nike Air Force">Nike Air Force</option>
            <option value="Nike SB DUNK">Nike SB DUNK</option>
            <option value="Nike Air Max">Nike Air Max</option>
            <option value="Adidas Samba">Adidas Samba</option>
            <option value="Adidas Gazelle">Adidas Gazelle</option>
            <option value="Adidas Forum Low">Adidas Forum Low</option>
            <option value="NB 560 Grey">NB 560 Grey</option>
          </SelectField>

          {/* Cantidad: mínimo 1 y clamp en onChange */}
          <FormField 
            label="Cantidad" 
            id="cantidad" 
            placeholder="Ej: 10" 
            type="number"
            min={1}
            value={formData.cantidad}
            onChange={(e) => {
              const value = Number(e.target.value);
              const safe = Number.isNaN(value) ? '' : Math.max(1, Math.floor(value));
              handleChange('cantidad', safe);
            }}
          />

          {/* Costo Unitario: mínimo 0, con decimales */}
          <FormField 
            label="Costo Unitario (S/.)" 
            id="costoUnitario" 
            placeholder="Ej: 180.00" 
            type="number"
            min={0}
            step="0.01"
            value={formData.costoUnitario}
            onChange={(e) => {
              const value = Number(e.target.value);
              const safe = Number.isNaN(value) ? '' : Math.max(0, value);
              handleChange('costoUnitario', safe);
            }}
          />

          <SelectField 
            label="Color" 
            id="color"
            value={formData.color}
            onChange={(e) => handleChange('color', e.target.value)}
          >
            <option value="">Seleccione color</option>
            <option value="Negro">Negro</option>
            <option value="Blanco">Blanco</option>
            <option value="Rojo">Rojo</option>
            <option value="Verde">Verde</option>
            <option value="Azul">Azul</option>
            <option value="Gris">Gris</option>
          </SelectField>

          <SelectField 
            label="Talla" 
            id="talla"
            value={formData.talla}
            onChange={(e) => handleChange('talla', e.target.value)}
          >
            <option value="">Seleccione talla</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
            <option value="43">43</option>
            <option value="44">44</option>
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
        <Button size="medium" variant="secondaryUNO" onClick={handleSubmit}>
          Añadir Producto
        </Button>
        <Button size="medium" variant="white" onClick={handleClose}>
          Cancelar
        </Button>
      </div>
    </Modal>
  );
};
