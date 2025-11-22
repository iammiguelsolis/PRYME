import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children, width = 'max-w-3xl' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-xl shadow-xl w-full ${width} max-h-[90vh] overflow-auto`}>

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

        {/* CONTENIDO */}
        <div className="p-5">
          {children}
        </div>

      </div>
    </div>
  );
};
