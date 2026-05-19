import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => (
    <div className="relative w-full">
      {icon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm',
          'placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
          'dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100',
          icon && 'pl-10',
          className,
        )}
        {...props}
      />
    </div>
  ),
)
Input.displayName = 'Input'
