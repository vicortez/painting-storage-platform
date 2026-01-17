type Props = {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  leftIcon?: React.ReactNode
  children: React.ReactNode
  className?: string
  disabled?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const tw = (strings: TemplateStringsArray) => strings[0]

function Button({
  variant = 'primary',
  size = 'md',
  leftIcon,
  children,
  className = '',
  ...props
}: Props) {
  const baseStyles = tw`inline-flex items-center justify-center transition-colors duration-200  focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none`
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-7 text-base',
  }

  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-white focus:ring-primary shadow-sm',
    secondary:
      'bg-transparent border border-primary text-primary font-medium hover:bg-blue-50 focus:ring-primary',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-600 shadow-sm',
    ghost: 'bg-transparent text-primary hover:bg-blue-50 focus:ring-primary',
  }

  return (
    <button
      className={`
        ${baseStyles} 
        ${sizes[size]} 
        ${variants[variant]} 
        ${className}
      `}
      {...props}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
    </button>
  )
}

export default Button
