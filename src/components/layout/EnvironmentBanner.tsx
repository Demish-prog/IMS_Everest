import { AlertTriangle, Tag } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/utils/cn'

/**
 * Status banner below navbar — environment, license, context tags.
 * Pills wrap on mobile; stack in compact rows.
 */
export function EnvironmentBanner() {
  const { environment, licenseWarning, contextTag } = useAppStore()

  return (
    <div
      className={cn(
        'border-b border-slate-200 dark:border-slate-700',
        'bg-surface px-3 py-2 md:px-6',
        'flex flex-wrap items-center gap-2 md:gap-3',
      )}
      role="status"
    >
      {/* Environment status */}
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
          Environment: <strong className="text-slate-800 dark:text-white">{environment}</strong>
        </span>
      </div>

      {/* License warning pill */}
      {licenseWarning && (
        <Badge variant="warning" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          <span className="hidden xs:inline">License expires in 30 days</span>
          <span className="xs:hidden">License warning</span>
        </Badge>
      )}

      {/* Context tag pill — truncates on mobile */}
      <Badge variant="info" className="flex items-center gap-1 max-w-full">
        <Tag className="h-3 w-3 flex-shrink-0" />
        <span className="truncate text-xs">{contextTag}</span>
      </Badge>
    </div>
  )
}
