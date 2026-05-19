import { cn } from '@/utils/cn'
import { ChevronDown } from 'lucide-react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
  compact?: boolean
}

/** Select — full width on mobile via parent w-full classes */
export function Select({ label, options, className, compact, ...props }: SelectProps) {
  return (
    <div className={cn('relative', compact ? 'min-w-0' : 'w-full sm:w-auto')}>
      {label && (
        <label className="mb-1 block text-xs font-medium text-label">
          {label}
        </label>
      )}
      <select
        className={cn(
          'appearance-none rounded-lg border border-slate-300 bg-white py-2 pl-3 pr-8 text-sm',
          'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
          'dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100',
          compact ? 'text-xs py-1.5' : 'w-full',
          className,
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  )
}
