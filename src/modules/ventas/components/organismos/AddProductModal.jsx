import { useState } from 'react';
import { Button } from '../../../../globals/components/atomos/Button';
import { FormField } from '../moleculas/FormField';
import { Modal } from '../moleculas/Modal';
import { SectionHeader } from '../moleculas/SectionHeader';
import { SelectField } from '../moleculas/SelectField';
import FOTO from '../../../../assets/images/3d_avatar_21.png';

export const AddProductModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    modelo: '',
    cantidad: 1,
    color: '',
    talla: '',
    precioUnitario: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.modelo || !formData.cantidad || !formData.color || !formData.talla || !formData.precioUnitario) {
      alert('Por favor complete todos los campos');
      return;
    }

    const cantidadNum = Number(formData.cantidad);
    const precioNum = Number(formData.precioUnitario);

    if (cantidadNum <= 0) {
      alert('La cantidad debe ser al menos 1');
      return;
    }

    if (precioNum < 0) {
      alert('El precio no puede ser negativo');
      return;
    }

    onAdd({
      ...formData,
      cantidad: cantidadNum,
      precioUnitario: precioNum,
      subtotal: cantidadNum * precioNum
    });

    // reset + cerrar
    setFormData({
      modelo: '',
      color: '',
      talla: '',
      cantidad: 1,
      precioUnitario: 0,
    });
    onClose();
  };


  const handleClose = () => {
    setFormData({ modelo: '', cantidad: 1, color: '', talla: '', precioUnitario: '' });
    onClose();
  };

  // Calcular subtotal en tiempo real
  const subtotalPreview = formData.cantidad && formData.precioUnitario 
    ? (parseInt(formData.cantidad) * parseFloat(formData.precioUnitario)).toFixed(2)
    : '0.00';

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <SectionHeader title="Añadir Producto" />
      
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col space-y-4">
          <SelectField 
            label="Seleccionar Modelo" 
            id="modelo"
            value={formData.modelo}
            onChange={(e) => handleChange('modelo', e.target.value)}
          >
            <option value="">Buscar Modelo</option>
            <option value="Nike Air Force">Nike Air Force</option>
            <option value="Nike Dunk SB">Nike Dunk SB</option>
            <option value="Nike Air Max">Nike Air Max</option>
            <option value="Adidas Samba">Adidas Samba</option>
            <option value="Adidas Gazelle">Adidas Gazelle</option>
            <option value="NB 560 Grey">NB 560 Grey</option>
          </SelectField>
          
          <FormField 
            label="Cantidad" 
            id="cantidad" 
            placeholder="1" 
            type="number"
            min={1}
            value={formData.cantidad}
            onChange={(e) => {
              const value = Number(e.target.value);
              // Aseguramos mínimo 1 y número entero
              const safe = Number.isNaN(value) ? '' : Math.max(1, Math.floor(value));
              handleChange('cantidad', safe);
            }}
          />


          <FormField 
            label="Precio unitario (S/.)" 
            id="precioUnitario" 
            placeholder="0.00" 
            type="number"
            min={0}
            step="0.01"
            value={formData.precioUnitario}
            onChange={(e) => {
              const value = Number(e.target.value);
              // Aseguramos que no sea negativo
              const safe = Number.isNaN(value) ? '' : Math.max(0, value);
              handleChange('precioUnitario', safe);
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

          {/* Preview del subtotal */}
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <span className="text-primary-01 font-bold">
              Subtotal: S/. {subtotalPreview}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          <img 
            src={FOTO}
            alt="Avatar" 
            className="w-48 h-48 rounded-full bg-blue-200 object-cover"
          />
        </div>
      </div>
      
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