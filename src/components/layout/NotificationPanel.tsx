import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCheck } from 'lucide-react'
import { useNotificationStore } from '@/store/useNotificationStore'
import {
  getNotificationPriority,
  NOTIFICATION_PRIORITIES,
  priorityDotClass,
  priorityLabel,
} from '@/utils/notifications'
import { cn } from '@/utils/cn'

/** Notification dropdown panel + toast stack */
export function NotificationPanel() {
  const {
    panelOpen,
    setPanelOpen,
    priorityFilter,
    openPanel,
    notifications,
    markAsRead,
    markAllRead,
    toasts,
    removeToast,
  } = useNotificationStore()

  const filtered = priorityFilter
    ? notifications.filter((n) => getNotificationPriority(n) === priorityFilter)
    : notifications

  const typeColors = {
    info: 'border-l-info',
    warning: 'border-l-warning',
    error: 'border-l-danger',
    success: 'border-l-success',
  }

  return (
    <>
      <AnimatePresence>
        {panelOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={cn(
              'fixed z-50 mt-1 rounded-xl bg-surface shadow-xl border border-slate-200 dark:border-slate-700',
              'top-14 md:top-16 right-2 md:right-4',
              'w-[calc(100vw-1rem)] sm:w-96 max-h-[70vh] overflow-hidden flex flex-col',
            )}
          >
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-heading">Notifications</h3>
                  {priorityFilter && (
                    <p className="text-xs text-label mt-0.5">
                      {priorityLabel[priorityFilter]} priority only
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                    aria-label="Mark all as read"
                  >
                    <CheckCheck className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPanelOpen(false)}
                    className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => openPanel()}
                  className={cn(
                    'text-xs px-2 py-0.5 rounded-full border transition-colors',
                    !priorityFilter
                      ? 'bg-primary-100 border-primary-300 text-primary-800 dark:bg-primary-900/40 dark:text-primary-200'
                      : 'border-slate-200 dark:border-slate-600 text-label hover:bg-slate-50 dark:hover:bg-slate-800',
                  )}
                >
                  All
                </button>
                {NOTIFICATION_PRIORITIES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => openPanel(p)}
                    className={cn(
                      'text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 transition-colors',
                      priorityFilter === p
                        ? 'border-slate-300 dark:border-slate-500 bg-slate-100 dark:bg-slate-800'
                        : 'border-transparent text-label hover:bg-slate-50 dark:hover:bg-slate-800',
                    )}
                  >
                    <span className={cn('h-2 w-2 rounded-full', priorityDotClass[p])} aria-hidden />
                    {priorityLabel[p]}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-y-auto scrollbar-thin flex-1">
              {filtered.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-label">No notifications in this category.</p>
              ) : (
                filtered.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => markAsRead(n.id)}
                    className={cn(
                      'w-full text-left px-4 py-3 border-b border-slate-50 dark:border-slate-800',
                      'hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors',
                      'border-l-4',
                      typeColors[n.type],
                      !n.read && 'bg-primary-50/30 dark:bg-primary-900/10',
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <span
                        className={cn(
                          'mt-1.5 h-2.5 w-2.5 rounded-full flex-shrink-0',
                          priorityDotClass[getNotificationPriority(n)],
                        )}
                        title={priorityLabel[getNotificationPriority(n)]}
                        aria-hidden
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{n.message}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{n.timestamp}</p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 z-[90] flex flex-col gap-2 w-full max-w-sm px-4 sm:px-0 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className={cn(
                'pointer-events-auto rounded-lg shadow-lg p-4 bg-surface border',
                'border-slate-200 dark:border-slate-700 flex justify-between gap-2',
              )}
            >
              <div>
                <p className="text-sm font-medium">{toast.title}</p>
                <p className="text-xs text-slate-500">{toast.message}</p>
              </div>
              <button type="button" onClick={() => removeToast(toast.id)} aria-label="Dismiss">
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  )
}
