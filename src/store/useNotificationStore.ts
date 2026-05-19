import { create } from 'zustand'
import { notifications as initialNotifications } from '@/services/sampleData'
import type { NotificationItem, NotificationPriority } from '@/types'

/**
 * Toast / notification system state.
 * Supports adding transient toasts and managing notification panel items.
 */
export interface Toast {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
}

interface NotificationState {
  notifications: NotificationItem[]
  toasts: Toast[]
  panelOpen: boolean
  /** Filter panel list by priority when user clicks a navbar icon */
  priorityFilter: NotificationPriority | null
  unreadCount: number
  setPanelOpen: (open: boolean) => void
  openPanel: (priority?: NotificationPriority) => void
  markAsRead: (id: string) => void
  markAllRead: () => void
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: initialNotifications,
  toasts: [],
  panelOpen: false,
  priorityFilter: null,
  unreadCount: initialNotifications.filter((n) => !n.read).length,

  setPanelOpen: (open) =>
    set((state) => ({
      panelOpen: open,
      priorityFilter: open ? state.priorityFilter : null,
    })),

  openPanel: (priority) =>
    set({
      panelOpen: true,
      priorityFilter: priority ?? null,
    }),

  markAsRead: (id) => {
    set((state) => {
      const notifications = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      )
      return {
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
      }
    })
  },

  markAllRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }))
  },

  addToast: (toast) => {
    const id = `toast-${Date.now()}`
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }))
    // Auto-dismiss after 5s
    setTimeout(() => get().removeToast(id), 5000)
  },

  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))
