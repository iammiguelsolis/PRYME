import { X } from 'lucide-react';
import { HiOutlineCheckCircle } from 'react-icons/hi2';

export const VideoTutorialModal = ({ isOpen, onClose, tutorial }) => {
  if (!isOpen || !tutorial) return null;

  // Prevenir scroll del body cuando el modal está abierto
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 h-full ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-hidden
          transform transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="border-b border-neutral-02 p-6 flex items-center justify-between bg-neutral-01">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 ${tutorial.color} rounded-xl flex items-center justify-center`}>
              <tutorial.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-01">{tutorial.title}</h2>
              <p className="text-text-02">{tutorial.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-text-02 hover:text-text-01 transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Video Placeholder */}
          <div className="bg-neutral-03 rounded-xl aspect-video mb-6 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary-01 flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
              <p className="text-text-02">Video tutorial próximamente disponible</p>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-text-01 flex items-center gap-2">
              <HiOutlineCheckCircle className="w-6 h-6 text-primary-01" />
              Pasos Detallados
            </h3>
            
            {tutorial.detailedSteps.map((step, index) => (
              <div key={index} className="bg-neutral-01 border border-neutral-02 rounded-xl p-6 hover:shadow-md transition-all">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary-01 text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-text-01 mb-2">{step.title}</h4>
                    <p className="text-text-02 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-blue-50 border border-primary-01/20 rounded-xl p-6">
            <h4 className="font-bold text-primary-01 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Consejos Útiles
            </h4>
            <ul className="space-y-2 text-sm text-text-02">
              <li className="flex gap-2">
                <span className="text-primary-01">•</span>
                <span>Revisa siempre los datos antes de confirmar cualquier operación</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary-01">•</span>
                <span>Utiliza los filtros para encontrar información más rápidamente</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary-01">•</span>
                <span>Puedes cancelar cualquier operación en curso haciendo clic en "Cancelar"</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary-01">•</span>
                <span>Si tienes dudas, consulta la sección de Preguntas Frecuentes</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-02 p-6 bg-neutral-01 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary-01 text-white rounded-xl font-semibold hover:bg-primary-02 transition-colors"
          >
            Cerrar Tutorial
          </button>
        </div>
      </div>
    </>
  );
};