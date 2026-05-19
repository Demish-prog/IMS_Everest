import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { AdminLayout } from '@/layouts/AdminLayout'
import { CardSkeleton } from '@/components/ui/Skeleton'

/**
 * Lazy-loaded routes for code splitting.
 * Each major module loads on demand to improve initial bundle size.
 */
const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
)
const AlertsPage = lazy(() => import('@/pages/AlertsPage').then((m) => ({ default: m.AlertsPage })))
const RetroPage = lazy(() => import('@/pages/RetroPage').then((m) => ({ default: m.RetroPage })))
const SessionsPage = lazy(() =>
  import('@/pages/SessionsPage').then((m) => ({ default: m.SessionsPage })),
)
const AdminOverview = lazy(() =>
  import('@/pages/admin/AdminOverview').then((m) => ({ default: m.AdminOverview })),
)
const ProbeManagement = lazy(() =>
  import('@/pages/admin/ProbeManagement').then((m) => ({ default: m.ProbeManagement })),
)
const SettingsPage = lazy(() =>
  import('@/pages/admin/SettingsPage').then((m) => ({ default: m.SettingsPage })),
)

function PageLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

export function AppRoutes() {
  return (
    <Routes>
      {/* Main app shell with sidebar + navbar */}
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<PageLoader />}>
              <DashboardPage />
            </Suspense>
          }
        />
        <Route
          path="alerts"
          element={
            <Suspense fallback={<PageLoader />}>
              <AlertsPage />
            </Suspense>
          }
        />
        <Route
          path="retro"
          element={
            <Suspense fallback={<PageLoader />}>
              <RetroPage />
            </Suspense>
          }
        />
        <Route
          path="sessions"
          element={
            <Suspense fallback={<PageLoader />}>
              <SessionsPage />
            </Suspense>
          }
        />
      </Route>

      {/* Admin panel — separate nested layout */}
      <Route path="admin" element={<AdminLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<PageLoader />}>
              <AdminOverview />
            </Suspense>
          }
        />
        <Route
          path="probes"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProbeManagement />
            </Suspense>
          }
        />
        <Route
          path="settings"
          element={
            <Suspense fallback={<PageLoader />}>
              <SettingsPage />
            </Suspense>
          }
        />
        <Route path="users" element={<AdminPlaceholder title="User Management" />} />
        <Route path="database" element={<AdminPlaceholder title="Database Configuration" />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

function AdminPlaceholder({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <p className="text-slate-500">{title} — coming soon</p>
    </div>
  )
}
