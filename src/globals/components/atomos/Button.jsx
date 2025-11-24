export const Button = ({ 
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  children, 
  onClick,
  className = '',
  icon = null,
  iconPosition = 'left',
}) => {
  
  // Estilos base - border invisible para evitar el salto
  const baseStyles = "font-semibold rounded-full transition-all duration-200 inline-flex items-center justify-center gap-2 border-2";
  
  // Variantes de color
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
    },
    secondaryUNO: {
      normal:  "bg-secondary-01 text-text-03",
      hover:   "hover:bg-secondary-01 hover:brightness-90 hover:text-text-03 hover:border-secondary-01",
      active:  "active:bg-secondary-01 active:brightness-70 active:text-text-03 active:border-secondary-01",
      disabled: "disabled:bg-neutral-02 disabled:text-neutral-03 disabled:border-neutral-02"
    },
    white: {
      normal:  "bg-text-03 text-primary-01 border-primary-01 border-2",
      hover:   "hover:bg-secondary-01 hover:brightness-90 hover:text-text-03 hover:border-secondary-01",
      active:  "active:bg-secondary-01 active:brightness-70 active:text-text-03 active:border-secondary-01",
      disabled: "disabled:bg-neutral-02 disabled:text-neutral-03 disabled:border-neutral-02"
    },
    whiteRed: {
      normal:  "bg-text-03 text-red-500 border-red-500 border-2",
      hover:   "hover:bg-red-600 hover:brightness-90 hover:text-text-03 hover:border-red-600",
      active:  "active:bg-red-700 active:brightness-70 active:text-text-03 active:border-red-700",
      disabled: "disabled:bg-neutral-02 disabled:text-neutral-03 disabled:border-neutral-02"
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
      title={children}
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
        <>
          {/* Ícono a la izquierda */}
          {icon && iconPosition === 'left' && (
            <span className="flex items-center">
              {icon}
            </span>
          )}

          {/* Texto / contenido */}
          {children && (
            <span className="flex items-center">
              {children}
            </span>
          )}

          {/* Ícono a la derecha */}
          {icon && iconPosition === 'right' && (
            <span className="flex items-center">
              {icon}
            </span>
          )}
        </>
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
