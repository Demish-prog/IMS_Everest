import { useCallback } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { useIsMobile } from '@/hooks/useMediaQuery'

/**
 * Sidebar behavior hook:
 * - Desktop: toggle collapse (icon-only vs expanded)
 * - Mobile: open/close overlay drawer; auto-close on navigation
 */
export function useSidebar() {
  const isMobile = useIsMobile()
  const {
    sidebarCollapsed,
    sidebarMobileOpen,
    setSidebarCollapsed,
    setSidebarMobileOpen,
    toggleSidebar,
  } = useAppStore()

  const openSidebar = useCallback(() => {
    if (isMobile) {
      setSidebarMobileOpen(true)
    } else {
      setSidebarCollapsed(false)
    }
  }, [isMobile, setSidebarCollapsed, setSidebarMobileOpen])

  const closeSidebar = useCallback(() => {
    if (isMobile) {
      setSidebarMobileOpen(false)
    }
  }, [isMobile, setSidebarMobileOpen])

  const handleToggle = useCallback(() => {
    if (isMobile) {
      setSidebarMobileOpen(!sidebarMobileOpen)
    } else {
      toggleSidebar()
    }
  }, [isMobile, sidebarMobileOpen, setSidebarMobileOpen, toggleSidebar])

  /** Call on route change — closes mobile drawer after navigation */
  const onNavigate = useCallback(() => {
    if (isMobile) setSidebarMobileOpen(false)
  }, [isMobile, setSidebarMobileOpen])

  return {
    isMobile,
    collapsed: sidebarCollapsed,
    mobileOpen: sidebarMobileOpen,
    openSidebar,
    closeSidebar,
    handleToggle,
    onNavigate,
  }
}
