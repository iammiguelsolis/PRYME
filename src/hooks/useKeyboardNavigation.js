import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Hook para navegación por teclado en toda la aplicación
 * Atajos disponibles:
 * - Alt + I: Ir a Inicio
 * - Alt + V: Ir a Ventas
 * - Alt + N: Nueva Venta (Registrar)
 * - Alt + B: Ir a Inventario
 * - Alt + G: Registrar Ingreso
 * - Alt + R: Ir a Reportes
 * - Alt + P: Ir a Perfil
 * - Alt + H: Ir a Ayuda
 * - Escape: Cerrar modales / Cancelar
 * - Ctrl + S: Guardar / Registrar
 */
export const useKeyboardNavigation = (customHandlers = {}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Alt + tecla para navegación
      if (e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'i':
            e.preventDefault();
            navigate('/inicio');
            break;
          case 'v':
            e.preventDefault();
            navigate('/ventas');
            break;
          case 'n':
            e.preventDefault();
            navigate('/ventas/registrar');
            break;
          case 'b':
            e.preventDefault();
            navigate('/inventario');
            break;
          case 'g':
            e.preventDefault();
            navigate('/inventario/registrarIngreso');
            break;
          case 'r':
            e.preventDefault();
            navigate('/reportes');
            break;
          case 'p':
            e.preventDefault();
            navigate('/perfil');
            break;
          case 'h':
            e.preventDefault();
            navigate('/ayuda');
            break;
          default:
            break;
        }
      }

      // Ctrl + S para guardar/registrar
      if (e.ctrlKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (customHandlers.onSave) {
          customHandlers.onSave();
        }
      }

      // Escape para cancelar/cerrar
      if (e.key === 'Escape') {
        if (customHandlers.onCancel) {
          customHandlers.onCancel();
        }
      }

      // Enter para confirmar (solo si está definido)
      if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        if (customHandlers.onConfirm) {
          customHandlers.onConfirm();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, customHandlers]);
};

// Atajos de teclado disponibles
export const KEYBOARD_SHORTCUTS = {
  navigation: [
    { key: 'Alt + I', description: 'Ir a Inicio' },
    { key: 'Alt + V', description: 'Ir a Ventas' },
    { key: 'Alt + N', description: 'Registrar Nueva Venta' },
    { key: 'Alt + B', description: 'Ir a Inventario' },
    { key: 'Alt + G', description: 'Registrar Ingreso' },
    { key: 'Alt + R', description: 'Ir a Reportes' },
    { key: 'Alt + P', description: 'Ir a Perfil' },
    { key: 'Alt + H', description: 'Ir a Ayuda' },
  ],
  actions: [
    { key: 'Ctrl + S', description: 'Guardar / Registrar' },
    { key: 'Ctrl + Enter', description: 'Confirmar acción' },
    { key: 'Escape', description: 'Cancelar / Cerrar' },
  ]
};