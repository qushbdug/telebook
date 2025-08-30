import React from 'react'
import { cn } from '@/lib/utils'
import { Eye, EyeOff, Search, X } from 'lucide-react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
  fullWidth?: boolean
  variant?: 'default' | 'search' | 'password'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      clearable = false,
      onClear,
      fullWidth = false,
      variant = 'default',
      disabled,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [inputValue, setInputValue] = React.useState(value || '')
    
    const inputType = variant === 'password' && showPassword ? 'text' : type
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value)
      if (onChange) {
        onChange(e)
      }
    }
    
    const handleClear = () => {
      setInputValue('')
      if (onClear) {
        onClear()
      }
    }
    
    const baseClasses = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
    
    const errorClasses = error ? 'border-destructive focus-visible:ring-destructive' : ''
    
    return (
      <div className={cn('space-y-2', fullWidth && 'w-full')}>
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          
          <input
            type={inputType}
            className={cn(
              baseClasses,
              errorClasses,
              leftIcon && 'pl-10',
              (rightIcon || clearable || variant === 'password') && 'pr-10',
              variant === 'search' && 'pl-10',
              className
            )}
            ref={ref}
            value={inputValue}
            onChange={handleChange}
            disabled={disabled}
            {...props}
          />
          
          {variant === 'search' && !leftIcon && (
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          )}
          
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 space-x-reverse">
            {variant === 'password' && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                disabled={disabled}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}
            
            {clearable && inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="text-muted-foreground hover:text-foreground transition-colors"
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </button>
            )}
            
            {rightIcon && !clearable && variant !== 'password' && (
              <span className="text-muted-foreground">{rightIcon}</span>
            )}
          </div>
        </div>
        
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input