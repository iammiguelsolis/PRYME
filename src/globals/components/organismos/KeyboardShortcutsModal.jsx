import { HiOutlineXMark, HiOutlineCommandLine } from 'react-icons/hi2';
import { KEYBOARD_SHORTCUTS } from '../../../hooks/useKeyboardNavigation';

export const KeyboardShortcutsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-neutral-01 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-01 to-primary-02 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <HiOutlineCommandLine className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Atajos de Teclado</h2>
                <p className="text-blue-100 text-sm">Navega más rápido por el sistema</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <HiOutlineXMark className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Navegación */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-text-01 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-01"></span>
              Navegación
            </h3>
            <div className="space-y-2">
              {KEYBOARD_SHORTCUTS.navigation.map((shortcut, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-neutral-03 rounded-xl hover:bg-neutral-02 transition-colors"
                >
                  <span className="text-text-01 text-sm">{shortcut.description}</span>
                  <kbd className="px-3 py-1.5 bg-white border-2 border-neutral-02 rounded-lg text-xs font-mono font-semibold text-text-01 shadow-sm">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>

          {/* Acciones */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-text-01 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary-01"></span>
              Acciones
            </h3>
            <div className="space-y-2">
              {KEYBOARD_SHORTCUTS.actions.map((shortcut, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-neutral-03 rounded-xl hover:bg-neutral-02 transition-colors"
                >
                  <span className="text-text-01 text-sm">{shortcut.description}</span>
                  <kbd className="px-3 py-1.5 bg-white border-2 border-neutral-02 rounded-lg text-xs font-mono font-semibold text-text-01 shadow-sm">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border-2 border-primary-01/20 rounded-xl p-4">
            <p className="text-sm text-text-01 mb-2">
              <span className="font-semibold text-primary-01">💡 Consejo:</span>
            </p>
            <ul className="text-xs text-text-02 space-y-1 ml-4">
              <li>• Los atajos funcionan en cualquier parte del sistema</li>
              <li>• Presiona <kbd className="px-2 py-0.5 bg-white rounded text-[10px] font-mono">?</kbd> en cualquier momento para ver esta ayuda</li>
              <li>• Usa <kbd className="px-2 py-0.5 bg-white rounded text-[10px] font-mono">Tab</kbd> para navegar entre campos de formularios</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-02 p-4 bg-neutral-03/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary-01 text-white rounded-xl font-semibold hover:bg-primary-02 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};