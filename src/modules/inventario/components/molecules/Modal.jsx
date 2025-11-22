export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    // Overlay con BLUR
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Contenido del modal */}
      <div 
        className="bg-neutral-01 rounded-lg shadow-2xl p-6 w-full max-w-lg z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
