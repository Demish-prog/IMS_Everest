import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/utils/cn'
import type { BreadcrumbItem } from '@/types'

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1 text-sm text-slate-500', className)}>
      <Link to="/dashboard" className="hover:text-primary-600 transition-colors" aria-label="Home">
        <Home className="h-4 w-4" />
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="h-3 w-3" aria-hidden />
          {item.path ? (
            <Link to={item.path} className="hover:text-primary-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-heading-secondary">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
