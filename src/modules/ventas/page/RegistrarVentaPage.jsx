import { useState } from 'react';
import { ClientInfoForm } from '../components/organismos/ClientInfoForm';
import { ProductList } from '../components/organismos/ProductList';
import { SaleTotal } from '../components/organismos/SaleTotal';
import { AddProductModal } from '../components/organismos/AddProductModal';
import { SuccessModal } from '../components/organismos/SuccessModal';

const RegistrarVentaPage = () => {
  // --- Estados para controlar los modales ---
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  // const [isSaleSuccessModalOpen, setSaleSuccessModalOpen] = useState(false);

  // Funciones para abrir/cerrar modales
  const handleAddProduct = () => {
    setAddModalOpen(false); // Cierra el modal de añadir
    setSuccessModalOpen(true); // Abre el modal de éxito
  };
  
  const handleRegisterSale = () => {
    // Lógica de registro...
    // al terminar:
    // setSaleSuccessModalOpen(true);
    alert("¡Venta Registrada! (Implementar modal de éxito de venta)");
  };

  return (
    <div className="h-screen flex flex-col p-6 bg-neutral-03">
      {/* Breadcrumb */}
      <h1 className="text-l font-bold text-text-01 bg-neutral-01 rounded-4xl shadow-md p-2 px-4 flex flex-col mb-4">
        Ventas / Registrar Venta
      </h1>

      {/* Formulario cliente */}
      <ClientInfoForm />


      <ProductList onAddProductClick={() => setAddModalOpen(true)} />

      {/* Totales (abajo fijo) */}
      <SaleTotal onRegisterSaleClick={handleRegisterSale} />

      {/* Modales */}
      <AddProductModal 
        isOpen={isAddModalOpen} 
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddProduct}
      />
      
      <SuccessModal 
        isOpen={isSuccessModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        title="Producto Añadido con Exito"
        primaryActionText="Añadir otro Producto"
        secondaryActionText="Volver"
        onPrimaryAction={() => {
          setSuccessModalOpen(false);
          setAddModalOpen(true);
        }}
        onSecondaryAction={() => setSuccessModalOpen(false)}
      />
    </div>
  );
};

export default RegistrarVentaPage;