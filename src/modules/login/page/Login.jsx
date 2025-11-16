import { BrandPanel } from "../components/organismos/BrandPanel";
import { LoginForm } from "../components/organismos/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-neutral-03 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Círculo decorativo superior derecha - Azul claro */}
      <div className="absolute -top-20 -right-20 w-40 h-40 sm:-top-28 sm:-right-28 sm:w-64 sm:h-64 md:-top-32 md:-right-32 md:w-80 md:h-80 bg-primary-01 rounded-full opacity-40"></div>
      
      {/* Círculo decorativo inferior izquierda - Azul oscuro con borde */}
      <div className="absolute -bottom-24 -left-24 w-48 h-48 sm:-bottom-32 sm:-left-32 sm:w-80 sm:h-80 md:-bottom-40 md:-left-40 md:w-[500px] md:h-[500px] border-secondary-01 border-[15px] sm:border-[40px] md:border-[60px] rounded-full"></div>

      {/* Contenedor principal del Login */}  
      <div class="relative z-10 w-full max-w-4xl md:min-h-[500px] mx-auto 
     bg-neutral-01 rounded-xl 
     shadow-[-20px_20px_10px_rgba(0,0,0,0.20)]
     overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Panel Izquierdo (Marca) - Oculto en móviles */}
        <div className="hidden md:flex items-center justify-center bg-neutral-01">
          <BrandPanel />
        </div>

        {/* Panel Derecho (Formulario) */}
        <div className="flex items-center justify-center bg-secondary-01">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;