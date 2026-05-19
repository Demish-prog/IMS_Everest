import type { NotificationItem, NotificationPriority } from '@/types'

/** Four priority tiers — each has a dedicated navbar icon color */
export const NOTIFICATION_PRIORITIES: NotificationPriority[] = [
  'critical',
  'high',
  'medium',
  'low',
]

/** Active (has unread) — full color + glow */
export const priorityIconActiveClass: Record<NotificationPriority, string> = {
  critical: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.75)]',
  high: 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.65)]',
  medium: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.55)]',
  low: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.55)]',
}

/** Idle (no unread for this tier) — muted ring, transparent fill */
export const priorityIconIdleClass: Record<NotificationPriority, string> = {
  critical: 'bg-red-500/20 ring-red-500/40',
  high: 'bg-orange-500/20 ring-orange-500/40',
  medium: 'bg-amber-400/20 ring-amber-400/40',
  low: 'bg-emerald-500/20 ring-emerald-500/40',
}

/** Panel list item dot */
export const priorityDotClass: Record<NotificationPriority, string> = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-amber-400',
  low: 'bg-emerald-500',
}

export const priorityLabel: Record<NotificationPriority, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

const priorityOrder: Record<NotificationPriority, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
}

export function getNotificationPriority(notification: NotificationItem): NotificationPriority {
  if (notification.priority) return notification.priority
  switch (notification.type) {
    case 'error':
      return 'critical'
    case 'warning':
      return 'medium'
    case 'success':
    case 'info':
    default:
      return 'low'
  }
}

export function countUnreadByPriority(notifications: NotificationItem[]): Record<NotificationPriority, number> {
  const counts: Record<NotificationPriority, number> = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
  }
  for (const n of notifications) {
    if (!n.read) {
      counts[getNotificationPriority(n)] += 1
    }
  }
  return counts
}

export function getUnreadByPriority(notifications: NotificationItem[]) {
  return notifications
    .filter((n) => !n.read)
    .sort(
      (a, b) =>
        priorityOrder[getNotificationPriority(a)] - priorityOrder[getNotificationPriority(b)],
    )
}
