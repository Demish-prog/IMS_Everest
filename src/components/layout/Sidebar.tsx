import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import * as Icons from 'lucide-react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { navigationConfig } from '@/config/navigation'
import { useAppStore } from '@/store/useAppStore'
import { useSidebar } from '@/hooks/useSidebar'
import { cn } from '@/utils/cn'
import type { NavItem } from '@/types'

type IconName = keyof typeof Icons

function NavIcon({ name, className }: { name: string; className?: string }) {
  const Icon = Icons[name as IconName] as React.ComponentType<{ className?: string }>
  if (!Icon) return <Icons.Circle className={className} />
  return <Icon className={className} />
}

function NavGroup({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const [expanded, setExpanded] = useState(true)
  const location = useLocation()
  const hasChildren = item.children && item.children.length > 0
  const isActive = item.path === location.pathname

  if (!hasChildren && item.path) {
    return (
      <NavLink
        to={item.path}
        className={({ isActive: active }) =>
          cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200',
            active || isActive
              ? 'bg-sidebar-active text-white'
              : 'text-slate-400 hover:bg-sidebar-hover hover:text-white',
            collapsed && 'justify-center px-2',
          )
        }
        title={collapsed ? item.label : undefined}
      >
        <NavIcon name={item.icon} className="h-5 w-5 flex-shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 truncate">{item.label}</span>
            {item.badge != null && (
              <span className="rounded-full bg-danger px-1.5 py-0.5 text-[10px] font-bold text-white">
                {item.badge}
              </span>
            )}
          </>
        )}
      </NavLink>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => !collapsed && setExpanded(!expanded)}
        className={cn(
          'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm',
          'text-slate-400 hover:bg-sidebar-hover hover:text-white transition-colors',
          collapsed && 'justify-center px-2',
        )}
        aria-expanded={expanded}
      >
        <NavIcon name={item.icon} className="h-5 w-5 flex-shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 text-left truncate">{item.label}</span>
            {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </>
        )}
      </button>

      <AnimatePresence>
        {!collapsed && expanded && item.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden ml-4 mt-1 space-y-0.5 border-l border-sidebar-border pl-3"
          >
            {item.children.map((child) =>
              child.path ? (
                <NavLink
                  key={child.id}
                  to={child.path}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                      isActive
                        ? 'text-primary-300 bg-sidebar-active/50'
                        : 'text-slate-500 hover:text-white hover:bg-sidebar-hover',
                    )
                  }
                >
                  <NavIcon name={child.icon} className="h-4 w-4" />
                  <span className="truncate">{child.label}</span>
                </NavLink>
              ) : (
                <span
                  key={child.id}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 cursor-default"
                >
                  <NavIcon name={child.icon} className="h-4 w-4" />
                  <span className="truncate">{child.label}</span>
                </span>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Left sidebar — fixed on desktop, overlay drawer on mobile.
 * Smooth width animation on collapse; scrollable nav content.
 */
export function Sidebar() {
  const { sidebarCollapsed, sidebarMobileOpen } = useAppStore()
  const { isMobile, closeSidebar, onNavigate } = useSidebar()

  // Close mobile drawer when route changes
  const handleNav = () => onNavigate()

  const sidebarWidth = sidebarCollapsed && !isMobile ? 'w-[72px]' : 'w-64'

  const sidebarContent = (
    <aside
      className={cn(
        'flex flex-col h-full bg-sidebar text-slate-300',
        'border-r border-sidebar-border',
        sidebarWidth,
        'transition-[width] duration-300 ease-in-out',
      )}
      aria-label="Main navigation"
    >
      {/* Scrollable nav — important when menu exceeds viewport height */}
      <nav
        className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin py-4 px-2 space-y-1"
        onClick={handleNav}
      >
        {navigationConfig.map((item) => (
          <NavGroup key={item.id} item={item} collapsed={sidebarCollapsed && !isMobile} />
        ))}
      </nav>

      {!sidebarCollapsed && (
        <div className="p-3 border-t border-sidebar-border text-xs text-slate-500">
          Everest IMS v2.4.1
        </div>
      )}
    </aside>
  )

  // Mobile: overlay drawer with backdrop
  if (isMobile) {
    return (
      <AnimatePresence>
        {sidebarMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={closeSidebar}
              aria-hidden
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-14 left-0 bottom-0 z-40 w-64 shadow-[var(--shadow-drawer)]"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  }

  // Desktop/tablet: fixed sidebar
  return (
    <div className={cn('fixed top-14 md:top-16 left-0 bottom-0 z-30', sidebarWidth, 'transition-[width] duration-300')}>
      {sidebarContent}
    </div>
  )
}
