import { useState } from 'react';

import { EntryInfoForm } from '../components/organisms/EntryInfoForm';
import { BatchList } from '../components/organisms/BatchList';
import { EntryTotal } from '../components/organisms/EntryTotal';

import { AddProductModal } from '../components/organisms/AddProductModal';
import { SuccessModal } from '../components/organisms/SuccessModal';

const RegistrarIngresoPage = () => {
  // --- Estados para controlar los modales ---
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [saleSuccessModalOpen, setSaleSuccessModalOpen] = useState(false);

  // Funciones para abrir/cerrar modales
  const handleAddProduct = () => {
    setAddModalOpen(false); // Cierra el modal de añadir
    setSuccessModalOpen(true); // Abre el modal de éxito
  };

  const handleRegisterSale = () => {
    // Lógica de registro...
    // al terminar:
    setSaleSuccessModalOpen(true);
    //alert("¡Venta Registrada! (Implementar modal de éxito de venta)");
  };

  return (
    <div className="h-screen flex flex-col p-6 bg-neutral-03">
      {/* Breadcrumb */}
      <h1 className="text-l font-bold text-text-01 bg-neutral-01 rounded-4xl shadow-md p-2 px-4 flex flex-col mb-4">
        Inventario / Registrar Ingreso
      </h1>

      {/* Formulario cliente */}
      <EntryInfoForm />

      <BatchList onAddProductClick={() => setAddModalOpen(true)} />

      {/* Totales (abajo fijo) */}
      <EntryTotal onRegisterSaleClick={handleRegisterSale} />

      {/* Modales */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddProduct}
      />

      <SuccessModal
        isOpen={saleSuccessModalOpen}
        onClose={() => setSaleSuccessModalOpen(false)}
        onRegisterAnother={() => {
          setSaleSuccessModalOpen(false);
        }}
      />
    </div>
  );
};

export default RegistrarIngresoPage;

