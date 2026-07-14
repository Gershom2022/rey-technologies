function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  className = '',
  ...props 
}) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed inline-block';
  
  const variants = {
    primary: 'bg-primary text-white hover:brightness-110 shadow-md hover:shadow-lg',
    secondary: 'bg-secondary text-white hover:brightness-110 shadow-md hover:shadow-lg',
    accent: 'bg-accent text-white hover:brightness-110 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-primary text-primary hover:bg-light',
    ghost: 'text-primary hover:text-accent hover:bg-light rounded-lg',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    full: 'w-full px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;