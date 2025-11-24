// components/molecules/Modal.jsx

import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children }) => {
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
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E4E7EE]">
          <h3 className="text-xl font-bold text-[#1B8EF2]">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-[#D06D49] hover:text-red-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Content con scroll */}
        <div className="p-5 overflow-y-auto h-[calc(100%-73px)]">
          {children}
        </div>
      </div>
    </>
  );
};