// src/globals/layaout/MainLayout.jsx (MODIFICADO)
import { useState, useEffect } from 'react';
import { Sidebar } from "../components/organismos/Sidebar";
import { Outlet } from "react-router-dom";
import { KeyboardShortcutsModal } from "../components/organismos/KeyboardShortcutsModal";
import { useKeyboardNavigation } from "../../hooks/useKeyboardNavigation";
import { HiOutlineCommandLine } from 'react-icons/hi2';

export const MainLayout = () => {
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Activar navegación por teclado global
  useKeyboardNavigation();

  // Escuchar la tecla "?" para mostrar atajos
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === '?' && !e.ctrlKey && !e.altKey && !e.metaKey) {
        // Verificar que no estemos en un input/textarea
        if (!['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
          e.preventDefault();
          setShowShortcuts(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto bg-neutral-03 relative">
        <Outlet />

        {/* Botón flotante de ayuda de teclado */}
        <button
          onClick={() => setShowShortcuts(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary-01 hover:bg-primary-02 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-30 group"
          title="Atajos de teclado (presiona ?)"
        >
          <HiOutlineCommandLine className="w-6 h-6" />
          <span className="absolute -top-10 right-0 bg-text-01 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Presiona <kbd className="bg-white/20 px-1.5 py-0.5 rounded">?</kbd>
          </span>
        </button>
      </main>

      <KeyboardShortcutsModal 
        isOpen={showShortcuts} 
        onClose={() => setShowShortcuts(false)} 
      />
    </div>
  );
};