  import { useState } from 'react'
  import {
    ChevronDown,
    Menu,
    Moon,
    Search,
    Sun,
    User,
    X,
  } from 'lucide-react'
  import { motion, AnimatePresence } from 'framer-motion'
  import { useAppStore } from '@/store/useAppStore'
  import { useNotificationStore } from '@/store/useNotificationStore'
  import { useSidebar } from '@/hooks/useSidebar'
  import { probes } from '@/services/sampleData'
  import { Input } from '@/components/ui/Input'
  import { Button } from '@/components/ui/Button'
  import { NotificationPriorityIcons } from '@/components/layout/NotificationPriorityDots'
  import { cn } from '@/utils/cn'

  /**
   * Fixed top navbar — sticky on all viewports.
   * Search collapses on mobile; probe selector compacts.
   */
  export function TopNavbar() {
    const { handleToggle } = useSidebar()
    const { selectedProbe, setSelectedProbe, theme, setTheme } = useAppStore()
    const { notifications, openPanel, panelOpen, priorityFilter } = useNotificationStore()
    const [searchOpen, setSearchOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

    return (
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'bg-sidebar border-b border-sidebar-border',
          'h-14 md:h-16',
        )}
        role="banner"
      >
        <div className="grid h-full w-full grid-cols-[auto_1fr_auto] items-center gap-3 px-3 md:px-6 lg:px-8">
          {/* LEFT: Hamburger + Logo */}
          <div className="flex items-center gap-2 md:gap-3 justify-self-start">
            <button
              type="button"
              onClick={handleToggle}
              className="rounded-lg p-2 text-slate-300 hover:bg-sidebar-hover hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white font-bold text-sm">
                E
              </div>
              <div className="hidden sm:block">
                <span className="font-semibold text-white text-sm md:text-base">Everest IMS</span>
                <p className="text-[10px] md:text-xs text-slate-400 leading-tight">Network Analytics</p>
              </div>
            </div>
          </div>

          {/* CENTER: Global search — hidden on xs, icon toggle on sm */}
          <div className="flex justify-center items-center w-full min-w-0 px-2 md:px-6">
            {/* Desktop/tablet search */}
            <div className="hidden md:block w-full max-w-lg lg:max-w-xl">
              <Input
                type="search"
                placeholder="Search flows, devices, alerts..."
                icon={<Search className="h-4 w-4" />}
                className="bg-sidebar-hover border-sidebar-border text-slate-200 placeholder:text-slate-500"
                aria-label="Global search"
              />
            </div>

            {/* Mobile: search icon expands overlay */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="rounded-lg p-2 text-slate-300 hover:bg-sidebar-hover"
                aria-label="Open search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* RIGHT: Notifications, probe, user — aligned to end */}
          <div className="flex items-center justify-end gap-1 sm:gap-2 md:gap-3 justify-self-end">
            <button
              type="button"
              onClick={toggleTheme}
              className="hidden sm:flex rounded-lg p-2 text-slate-300 hover:bg-sidebar-hover transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Four priority icons: critical (red), high (orange), medium (yellow), low (green) */}
            <NotificationPriorityIcons
              notifications={notifications}
              onOpen={(priority) => {
                if (panelOpen && priorityFilter === priority) {
                  useNotificationStore.getState().setPanelOpen(false)
                } else {
                  openPanel(priority)
                }
              }}
              activeFilter={panelOpen ? priorityFilter : null}
            />

            {/* Probe selector — compact label on mobile */}
            <div className="relative">
              <select
                value={selectedProbe.id}  
                onChange={(e) => {
                  const probe = probes.find((p) => p.id === e.target.value)
                  if (probe) setSelectedProbe(probe)
                }}
                className={cn(
                  'appearance-none rounded-lg border border-sidebar-border bg-sidebar-hover',
                  'py-1.5 pl-2 pr-7 text-xs md:text-sm text-slate-200',
                  'max-w-[100px] sm:max-w-[160px] md:max-w-none truncate',
                )}
                aria-label="Select probe"
              >
                {probes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
            </div>

            {/* User avatar */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1 rounded-lg p-1.5 hover:bg-sidebar-hover transition-colors"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <ChevronDown className="hidden md:block h-3 w-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 top-full mt-2 w-48 rounded-lg bg-surface shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50"
                  >
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700">
                      <p className="text-sm font-medium">Admin User</p>
                      <p className="text-xs text-slate-500">admin@everest-ims.local</p>
                    </div>
                    <button type="button" className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
                      Profile
                    </button>
                    <button type="button" className="w-full px-3 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
                      Settings
                    </button>
                    <button type="button" className="w-full px-3 py-2 text-left text-sm text-danger hover:bg-red-50 dark:hover:bg-red-900/20">
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile search overlay — full width */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-sidebar-border px-3 py-2 overflow-hidden"
            >
              <div className="flex gap-2">
                <Input
                  type="search"
                  placeholder="Search..."
                  icon={<Search className="h-4 w-4" />}
                  className="flex-1 bg-sidebar-hover border-sidebar-border text-slate-200"
                  autoFocus
                />
                <Button variant="ghost" size="sm" onClick={() => setSearchOpen(false)} aria-label="Close search">
                  <X className="h-4 w-4 text-slate-300" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    )
  }
