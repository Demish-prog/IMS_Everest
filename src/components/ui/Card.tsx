import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddingMap = {
  none: '',
  sm: 'p-3',
  md: 'p-4 md:p-5',
  lg: 'p-5 md:p-6',
}

const cardClass = (padding: CardProps['padding'], className?: string) =>
  cn(
    'rounded-[var(--radius-card)] bg-surface shadow-[var(--shadow-card)]',
    'border border-slate-200/80 dark:border-slate-700/80',
    paddingMap[padding ?? 'md'],
    className,
  )

/** Rounded enterprise card with optional hover lift animation */
export function Card({ children, className, hover = false, padding = 'md' }: CardProps) {
  if (hover) {
    return (
      <motion.div
        className={cardClass(padding, className)}
        whileHover={{ y: -2, boxShadow: 'var(--shadow-card-hover)' }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={cardClass(padding, className)}>{children}</div>
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mb-3 flex items-center justify-between', className)}>{children}</div>
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn('text-sm font-semibold text-heading-card', className)}>{children}</h3>
  )
}
