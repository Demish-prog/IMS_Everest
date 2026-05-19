import type { NavItem } from '@/types'

/**
 * Sidebar navigation configuration.
 * Groups are expandable; paths map to React Router routes.
 */
export const navigationConfig: NavItem[] = [
  {
    id: 'dashboards',
    label: 'Dashboards',
    icon: 'LayoutDashboard',
    children: [
      { id: 'overview', label: 'Overview', path: '/dashboard', icon: 'BarChart3' },
      { id: 'traffic', label: 'Traffic', path: '/dashboard', icon: 'Activity' },
    ],
  },
  {
    id: 'retro',
    label: 'Retro',
    icon: 'History',
    path: '/retro',
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: 'Wrench',
    children: [
      { id: 'packet-capture', label: 'Packet Capture', icon: 'Radio' },
      { id: 'flow-export', label: 'Flow Export', icon: 'Download' },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    icon: 'Shield',
    children: [
      { id: 'threats', label: 'Threat Intel', icon: 'AlertOctagon' },
      { id: 'ids', label: 'IDS Events', icon: 'Eye' },
    ],
  },
  {
    id: 'netflow',
    label: 'Netflow',
    icon: 'GitBranch',
    children: [
      { id: 'sessions', label: 'Sessions', path: '/sessions', icon: 'Network' },
      { id: 'flows', label: 'Flow Records', icon: 'Layers' },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: 'Server',
    children: [
      { id: 'devices', label: 'Devices', icon: 'HardDrive' },
      { id: 'interfaces', label: 'Interfaces', icon: 'Cable' },
    ],
  },
  {
    id: 'alerts',
    label: 'Alerts',
    icon: 'Bell',
    path: '/alerts',
    badge: 47,
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'FileText',
    children: [
      { id: 'scheduled', label: 'Scheduled', icon: 'Calendar' },
      { id: 'custom', label: 'Custom Reports', icon: 'FilePlus' },
    ],
  },
  {
    id: 'customize',
    label: 'Customize',
    icon: 'Palette',
    children: [
      { id: 'dashboards-custom', label: 'Dashboards', icon: 'Layout' },
      { id: 'widgets', label: 'Widgets', icon: 'Grid3x3' },
    ],
  },
  {
    id: 'admin',
    label: 'Admin Panel',
    icon: 'Settings',
    path: '/admin',
  },
]
