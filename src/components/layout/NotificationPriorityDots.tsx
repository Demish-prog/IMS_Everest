import { cn } from '@/utils/cn'
import {
  countUnreadByPriority,
  NOTIFICATION_PRIORITIES,
  priorityIconActiveClass,
  priorityIconIdleClass,
  priorityLabel,
} from '@/utils/notifications'
import type { NotificationItem, NotificationPriority } from '@/types'

interface NotificationPriorityIconsProps {
  notifications: NotificationItem[]
  /** Opens notification panel; optional priority filter */
  onOpen: (priority?: NotificationPriority) => void
  activeFilter?: NotificationPriority | null
}

/**
 * Four fixed priority notification icons in the navbar.
 * Each icon is always visible in its tier color (red / orange / yellow / green).
 * Lights up with count badge when unread alerts exist for that priority.
 */
export function NotificationPriorityIcons({
  notifications,
  onOpen,
  activeFilter,
}: NotificationPriorityIconsProps) {
  const counts = countUnreadByPriority(notifications)

  return (
    <div className="flex items-center gap-1 sm:gap-1.5" role="group" aria-label="Notifications by priority">
      {NOTIFICATION_PRIORITIES.map((priority) => {
        const count = counts[priority]
        const hasUnread = count > 0
        const isActive = activeFilter === priority

        return (
          <button
            key={priority}
            type="button"
            onClick={() => onOpen(priority)}
            className={cn(
              'relative rounded-lg p-1 transition-colors',
              'hover:bg-sidebar-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400',
              isActive && 'bg-sidebar-hover',
            )}
            aria-label={`${priorityLabel[priority]} priority${hasUnread ? `, ${count} unread` : ', no alerts'}`}
          >
            {/* Colored circular notification icon for this priority tier */}
            <span
              className={cn(
                'block h-5 w-5 sm:h-6 sm:w-6 rounded-full ring-2 ring-sidebar transition-all',
                hasUnread ? priorityIconActiveClass[priority] : priorityIconIdleClass[priority],
                priority === 'critical' && hasUnread && 'animate-pulse',
              )}
              aria-hidden
            />

            {hasUnread && (
              <span
                className={cn(
                  'absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center',
                  'rounded-full px-0.5 text-[9px] font-bold text-white',
                  priority === 'critical' && 'bg-red-600',
                  priority === 'high' && 'bg-orange-600',
                  priority === 'medium' && 'bg-amber-600',
                  priority === 'low' && 'bg-emerald-600',
                )}
              >
                {count > 9 ? '9+' : count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

/** @deprecated Use NotificationPriorityIcons */
export const NotificationPriorityDots = NotificationPriorityIcons
