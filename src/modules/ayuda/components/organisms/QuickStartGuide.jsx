import { CategoryIcon } from '../atoms/CategoryIcon';
import {
  HiOutlineRocketLaunch,
  HiOutlineCheckCircle,
  HiOutlineArrowRight
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const quickStartSteps = [
  {
    number: 1,
    title: 'Conoce el Dashboard',
    description: 'Familiarízate con la página de inicio donde puedes ver resúmenes de ventas, ingresos y accesos rápidos.',
    action: 'Ir a Inicio',
    route: '/inicio'
  },
  {
    number: 2,
    title: 'Configura tu Perfil',
    description: 'Actualiza tu información personal, foto de perfil y credenciales de acceso.',
    action: 'Ir a Mi Perfil',
    route: '/perfil'
  },
  {
    number: 3,
    title: 'Registra tu Primer Ingreso',
    description: 'Añade productos a tu inventario registrando un ingreso con proveedor, productos y costos.',
    action: 'Registrar Ingreso',
    route: '/inventario/registrarIngreso'
  },
  {
    number: 4,
    title: 'Realiza tu Primera Venta',
    description: 'Registra una venta ingresando datos del cliente y los productos vendidos.',
    action: 'Registrar Venta',
    route: '/ventas/registrar'
  },
  {
    number: 5,
    title: 'Explora los Reportes',
    description: 'Revisa gráficos y estadísticas sobre tus ventas, inventario y rendimiento.',
    action: 'Ver Reportes',
    route: '/reportes'
  }
];

export const QuickStartGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-primary-01 to-primary-02 rounded-2xl shadow-lg p-8 text-white">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
          <HiOutlineRocketLaunch className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Guía de Inicio Rápido</h2>
          <p className="text-blue-100">Comienza a usar PRYME en 5 simples pasos</p>
        </div>
      </div>

      <div className="space-y-4">
        {quickStartSteps.map((step, index) => (
          <div
            key={step.number}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white text-primary-01 flex items-center justify-center font-bold flex-shrink-0">
                {step.number}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                <p className="text-blue-100 text-sm mb-3">{step.description}</p>
                <button
                  onClick={() => navigate(step.route)}
                  className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
                >
                  {step.action}
                  <HiOutlineArrowRight className="w-4 h-4" />
                </button>
              </div>
              <HiOutlineCheckCircle className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};