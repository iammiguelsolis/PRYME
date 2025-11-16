export const Button = ({ 
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  children, 
  onClick,
  className = ''
}) => {
  
  // Estilos base - border invisible para evitar el salto
  const baseStyles = "font-semibold rounded-full transition-all duration-200 inline-flex items-center justify-center gap-2 border-2 border-transparent";
  
  // Variantes de color
  // Normal: filled | Hover: fondo blanco con borde | Active: mismo color con overlay gris
  const variants = {
    primary: {
      normal: "bg-primary-01 text-text-03",
      hover: "hover:brightness-80 hover:border-complementary-01 hover:text-text-01",
      active: "active:bg-primary-01 active:brightness-90 active:border-transparent active:text-text-03",
      disabled: "disabled:bg-neutral-02 disabled:text-neutral-03 disabled:border-transparent"
    },
    secondary: {
      normal: "bg-complementary-03 text-text-03",
      hover: "hover:brightness-80 hover:border-complementary-01 hover:text-text-01",
      active: "active:bg-complementary-03 active:brightness-90 active:border-transparent active:text-text-03",
      disabled: "disabled:bg-neutral-02 disabled:text-neutral-03 disabled:border-transparent"
    },
    dark: {
      normal: "bg-text-01 text-text-03",
      hover: "hover:brightness-80 hover:border-complementary-01 hover:text-text-01",
      active: "active:bg-text-01 active:brightness-90 active:border-transparent active:text-text-03",
      disabled: "disabled:bg-neutral-02 disabled:text-neutral-03 disabled:border-transparent"
    },
    complementary: {
      normal: "bg-complementary-01 text-text-01",
      hover: "hover:brightness-80 hover:border-complementary-01 hover:text-text-01",
      active: "active:bg-complementary-01 active:brightness-90 active:border-transparent active:text-text-03",
      disabled: "disabled:bg-neutral-02 disabled:text-neutral-03 disabled:border-transparent"
    }
  };
  
  // Tamaños
  const sizes = {
    small: "px-4 py-1.5 text-sm min-h-[32px]",
    medium: "px-6 py-2 text-base min-h-[40px]",
    large: "px-8 py-3 text-lg min-h-[48px]"
  };
  
  // Obtener estilos de la variante
  const variantStyles = variants[variant] || variants.primary;
  const combinedStyles = `${variantStyles.normal} ${variantStyles.hover} ${variantStyles.active} ${variantStyles.disabled}`;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles} 
        ${combinedStyles} 
        ${sizes[size]} 
        ${disabled || loading ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {loading ? (
        <LoadingDots />
      ) : (
        children
      )}
    </button>
  );
};

// Componente de puntos de carga animados
const LoadingDots = () => {
  return (
    <div className="flex gap-1">
      <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-2 h-2 bg-current rounded-full animate-bounce"></span>
    </div>
  );
};