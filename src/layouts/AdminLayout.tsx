import { NavLink, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Server, Settings, Users, Database, Radio } from 'lucide-react'
import { TopNavbar } from '@/components/layout/TopNavbar'
import { EnvironmentBanner } from '@/components/layout/EnvironmentBanner'
import { ModalContainer } from '@/modals/ModalContainer'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'
import { cn } from '@/utils/cn'

const adminNav = [
  { path: '/admin', label: 'Overview', icon: Server, end: true },
  { path: '/admin/probes', label: 'Probe Management', icon: Radio },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
  { path: '/admin/users', label: 'Users', icon: Users },
  { path: '/admin/database', label: 'Database', icon: Database },
]

/**
 * Admin panel layout with nested sidebar.
 * On mobile: admin nav becomes horizontal scrollable tabs.
 */
export function AdminLayout() {
  return (
    <div className="min-h-screen bg-content">
      <TopNavbar />
      <EnvironmentBanner />

      <div className="pt-0 md:pt-0">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-7rem)]">
          {/* Nested admin sidebar — horizontal scroll on mobile */}
          <aside
            className={cn(
              'bg-sidebar border-b lg:border-b-0 lg:border-r border-sidebar-border',
              'lg:w-56 flex-shrink-0',
            )}
          >
            <nav
              className={cn(
                'flex lg:flex-col gap-1 p-3',
                /* Mobile: scrollable horizontal tabs */
                'overflow-x-auto scrollbar-thin lg:overflow-x-visible',
              )}
              aria-label="Admin navigation"
            >
              {adminNav.map(({ path, label, icon: Icon, end }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={end}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm whitespace-nowrap transition-colors',
                      isActive
                        ? 'bg-sidebar-active text-white'
                        : 'text-slate-400 hover:bg-sidebar-hover hover:text-white',
                    )
                  }
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </aside>

          {/* Admin content area */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            <ErrorBoundary>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Outlet />
              </motion.div>
            </ErrorBoundary>
          </main>
        </div>
      </div>

      <ModalContainer />
    </div>
  )
}
