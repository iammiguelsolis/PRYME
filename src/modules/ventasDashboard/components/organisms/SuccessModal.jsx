import { Check } from 'lucide-react';

export const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-xs">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-[#F29F1B] flex items-center justify-center">
          <Check size={64} className="text-[#F29F1B]" strokeWidth={3} />
        </div>
        <p className="text-xl font-bold text-[#0F172A] mb-1">Devolución Registrada</p>
        <p className="text-xl font-bold text-[#0F172A] mb-6">con Exito</p>
        <button 
          onClick={onClose}
          className="px-10 py-2.5 bg-[#1B8EF2] text-white rounded-lg text-base font-medium hover:bg-[#1675F2] transition-all"
        >
          Volver
        </button>
      </div>
    </div>
  );
};