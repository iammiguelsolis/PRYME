import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children, width = 'max-w-3xl' }) => {
  // Prevenir scroll del body cuando el modal está abierto
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }

  return (
    <>
      {/* Overlay con fade */}
      <div 
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Panel lateral */}
      <div 
        className={`fixed top-0 right-0 h-full w-full ${width} bg-white shadow-2xl z-50 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* HEADER */}
        <div className="p-4 border-b border-[#E4E7EE]">
          {/* RECTÁNGULO AZUL AMPLIO - TÍTULO + X */}
          <div className="border-2 border-primary-02 rounded-2xl px-5 py-3 w-full flex items-center justify-between">
            {/* TÍTULO */}
            <h2 className="text-2xl font-bold text-primary-02">
              {title}
            </h2>

            {/* BOTÓN X */}
            <button
              onClick={onClose}
              className="text-[#C75F39] hover:text-[#A34927] transition"
            >
              <X size={26} />
            </button>
          </div>
        </div>

        {/* CONTENIDO con scroll */}
        <div className="p-5 overflow-y-auto h-[calc(100%-89px)]">
          {children}
        </div>
      </div>
    </>
  );
};