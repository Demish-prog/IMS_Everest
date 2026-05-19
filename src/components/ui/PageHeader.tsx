import { type ReactNode } from 'react'
import { Breadcrumbs } from './Breadcrumbs'
import { Select } from './Select'
import { useAppStore } from '@/store/useAppStore'
import { timeRanges } from '@/services/sampleData'
import type { BreadcrumbItem } from '@/types'
import { cn } from '@/utils/cn'

interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumbs?: BreadcrumbItem[]
  actions?: ReactNode
  showTimeRange?: boolean
}

/**
 * Page header with breadcrumbs, title, time range selector.
 * Toolbar stacks vertically on mobile.
 */
export function PageHeader({
  title,
  subtitle,
  breadcrumbs = [],
  actions,
  showTimeRange = true,
}: PageHeaderProps) {
  const { timeRange, setTimeRange } = useAppStore()

  return (
    <header className="mb-6">
      {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} className="mb-3" />}

      {/* Responsive flex: stack on mobile, row on desktop */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1
            className="font-bold text-heading truncate"
            style={{ fontSize: 'clamp(1.25rem, 1rem + 1vw, 1.75rem)' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-label">{subtitle}</p>
          )}
        </div>

        {/* Toolbar: full-width filters on mobile */}
        <div
          className={cn(
            'flex flex-col gap-2 w-full sm:w-auto sm:flex-row sm:items-center sm:flex-shrink-0',
          )}
        >
          {showTimeRange && (
            <Select
              label="Time range"
              className="w-full sm:w-40"
              options={timeRanges.map((t) => ({ value: t.value, label: t.label }))}
              value={timeRange.value}
              onChange={(e) => {
                const selected = timeRanges.find((t) => t.value === e.target.value)
                if (selected) setTimeRange(selected)
              }}
            />
          )}
          {actions}
        </div>
      </div>
    </header>
  )
}
