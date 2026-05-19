import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TopNavbar } from '@/components/layout/TopNavbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { EnvironmentBanner } from '@/components/layout/EnvironmentBanner'
import { NotificationPanel } from '@/components/layout/NotificationPanel'
import { ModalContainer } from '@/modals/ModalContainer'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'
import { useAppStore } from '@/store/useAppStore'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { cn } from '@/utils/cn'

/**
 * Main application shell:
 * - Fixed navbar (h-14 mobile, h-16 desktop)
 * - Collapsible sidebar (margin-left adjusts content)
 * - Light content area with route transitions
 */
export function MainLayout() {
  const location = useLocation()
  const { sidebarCollapsed } = useAppStore()
  const isMobile = useIsMobile()

  // Content offset: full width on mobile; sidebar width on desktop
  const contentMargin = isMobile
    ? 'ml-0'
    : sidebarCollapsed
      ? 'ml-[72px]'
      : 'ml-64'

  return (
    <div className="min-h-screen bg-content">
      <TopNavbar />
      <Sidebar />

      {/* Main content — below navbar + banner */}
      <div
        className={cn(
          'pt-14 md:pt-16 transition-[margin] duration-300',
          contentMargin,
        )}
      >
        <EnvironmentBanner />

        <main className="p-4 md:p-6 lg:p-8 min-h-[calc(100vh-8rem)]">
          <ErrorBoundary>
            {/* Route transition animation */}
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Outlet />
            </motion.div>
          </ErrorBoundary>
        </main>
      </div>

      <NotificationPanel />
      <ModalContainer />
    </div>
  )
}
