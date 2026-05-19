/** Core domain types for Everest IMS Network Analytics */

export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info'

export type ThemeMode = 'light' | 'dark' | 'system'

export interface NavItem {
  id: string
  label: string
  path?: string
  icon: string
  children?: NavItem[]
  badge?: number
}

export interface KpiMetric {
  id: string
  label: string
  value: string | number
  change?: number
  changeLabel?: string
  trend?: 'up' | 'down' | 'neutral'
  sparkline?: number[]
  status?: 'healthy' | 'warning' | 'critical'
}

export interface AlertItem {
  id: string
  title: string
  description: string
  severity: Severity
  timestamp: string
  tags: string[]
  source: string
  acknowledged: boolean
}

export interface SessionRow {
  id: string
  protocol: string
  sourceIp: string
  destinationIp: string
  sourcePort: number
  destPort: number
  router: string
  volume: string
  duration: string
  tags: string[]
}

export interface CounterData {
  id: string
  name: string
  value: number
  unit: string
  trend: number[]
}

export interface Probe {
  id: string
  name: string
  status: 'online' | 'offline' | 'degraded'
  location: string
}

export type NotificationPriority = 'critical' | 'high' | 'medium' | 'low'

export interface NotificationItem {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  /** Alert priority — drives navbar icon (critical=red, high=orange, medium=yellow, low=green) */
  priority?: NotificationPriority
  timestamp: string
  read: boolean
}

export interface ModalState {
  isOpen: boolean
  title: string
  content?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export interface BreadcrumbItem {
  label: string
  path?: string
}

export interface TimeRange {
  label: string
  value: string
}

export interface DeviceSummary {
  id: string
  name: string
  ip: string
  traffic: string
  status: 'online' | 'offline' | 'warning'
}
