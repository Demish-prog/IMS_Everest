import { create } from 'zustand'
import { probes } from '@/services/sampleData'
import type { Probe, ThemeMode, TimeRange } from '@/types'

/**
 * Global application state — sidebar, probe selection, time range, theme.
 * Zustand provides lightweight state without prop drilling.
 */
interface AppState {
  // Sidebar: collapsed on tablet, drawer on mobile (see useSidebar hook)
  sidebarCollapsed: boolean
  sidebarMobileOpen: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  setSidebarMobileOpen: (open: boolean) => void
  toggleSidebar: () => void

  // Active probe for global context
  selectedProbe: Probe
  setSelectedProbe: (probe: Probe) => void

  // Global time range for dashboards
  timeRange: TimeRange
  setTimeRange: (range: TimeRange) => void

  // Theme: light | dark | system
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void

  // Environment context
  environment: string
  licenseWarning: boolean
  contextTag: string
}

export const useAppStore = create<AppState>((set, get) => ({
  sidebarCollapsed: false,
  sidebarMobileOpen: false,
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setSidebarMobileOpen: (open) => set({ sidebarMobileOpen: open }),
  toggleSidebar: () => {
    const { sidebarCollapsed } = get()
    set({ sidebarCollapsed: !sidebarCollapsed })
  },

  selectedProbe: probes[0],
  setSelectedProbe: (probe) => set({ selectedProbe: probe }),

  timeRange: { label: 'Last 1h', value: '1h' },
  setTimeRange: (range) => set({ timeRange: range }),

  theme: 'light',
  setTheme: (theme) => {
    set({ theme })
    applyTheme(theme)
  },

  environment: 'Production',
  licenseWarning: true,
  contextTag: 'Region: US-East | Cluster: core-analytics',
}))

/** Apply theme class to document root for Tailwind dark mode */
function applyTheme(mode: ThemeMode) {
  const root = document.documentElement
  if (mode === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    root.classList.toggle('dark', prefersDark)
  } else {
    root.classList.toggle('dark', mode === 'dark')
  }
}

// Initialize theme on load
if (typeof window !== 'undefined') {
  applyTheme(useAppStore.getState().theme)
}
