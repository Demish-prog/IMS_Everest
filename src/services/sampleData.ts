import type {
  AlertItem,
  CounterData,
  DeviceSummary,
  KpiMetric,
  NotificationItem,
  Probe,
  SessionRow,
} from '@/types'

/** Sample KPI metrics for dashboard cards */
export const kpiMetrics: KpiMetric[] = [
  {
    id: 'throughput',
    label: 'Total Throughput',
    value: '42.8 Gbps',
    change: 12.4,
    changeLabel: 'vs last hour',
    trend: 'up',
    sparkline: [28, 32, 35, 38, 40, 41, 42.8],
    status: 'healthy',
  },
  {
    id: 'sessions',
    label: 'Active Sessions',
    value: '1.24M',
    change: -3.2,
    changeLabel: 'vs last hour',
    trend: 'down',
    sparkline: [1.35, 1.32, 1.3, 1.28, 1.26, 1.25, 1.24],
    status: 'healthy',
  },
  {
    id: 'alerts',
    label: 'Open Alerts',
    value: 47,
    change: 8,
    changeLabel: 'new today',
    trend: 'up',
    sparkline: [32, 35, 38, 40, 42, 45, 47],
    status: 'warning',
  },
  {
    id: 'latency',
    label: 'Avg Latency',
    value: '2.4 ms',
    change: -0.8,
    changeLabel: 'vs baseline',
    trend: 'down',
    sparkline: [3.2, 3.0, 2.9, 2.7, 2.6, 2.5, 2.4],
    status: 'healthy',
  },
]

export const trafficSummary = [
  { name: '00:00', inbound: 12, outbound: 18 },
  { name: '04:00', inbound: 8, outbound: 14 },
  { name: '08:00', inbound: 28, outbound: 32 },
  { name: '12:00', inbound: 42, outbound: 38 },
  { name: '16:00', inbound: 38, outbound: 45 },
  { name: '20:00', inbound: 32, outbound: 28 },
  { name: 'Now', inbound: 35, outbound: 40 },
]

export const topDevices: DeviceSummary[] = [
  { id: '1', name: 'core-router-01', ip: '10.0.1.1', traffic: '8.2 Gbps', status: 'online' },
  { id: '2', name: 'edge-fw-02', ip: '10.0.2.15', traffic: '5.1 Gbps', status: 'online' },
  { id: '3', name: 'dist-switch-07', ip: '10.0.3.42', traffic: '3.8 Gbps', status: 'warning' },
  { id: '4', name: 'probe-nyc-01', ip: '10.0.4.8', traffic: '2.9 Gbps', status: 'online' },
  { id: '5', name: 'agg-switch-12', ip: '10.0.5.33', traffic: '2.1 Gbps', status: 'offline' },
]

export const alertsData: AlertItem[] = [
  {
    id: 'a1',
    title: 'BGP Session Down — AS64512',
    description: 'Peering session with upstream provider lost. Failover route active.',
    severity: 'critical',
    timestamp: '2026-05-19T14:32:00Z',
    tags: ['BGP', 'WAN', 'Core'],
    source: 'core-router-01',
    acknowledged: false,
  },
  {
    id: 'a2',
    title: 'High CPU Utilization — edge-fw-02',
    description: 'CPU sustained above 85% for 15 minutes on edge firewall.',
    severity: 'high',
    timestamp: '2026-05-19T14:18:00Z',
    tags: ['CPU', 'Firewall'],
    source: 'edge-fw-02',
    acknowledged: false,
  },
  {
    id: 'a3',
    title: 'Netflow Export Gap Detected',
    description: 'Missing flow records for 3 minutes on probe-nyc-01.',
    severity: 'medium',
    timestamp: '2026-05-19T13:55:00Z',
    tags: ['Netflow', 'Probe'],
    source: 'probe-nyc-01',
    acknowledged: true,
  },
  {
    id: 'a4',
    title: 'TLS Certificate Expiring in 14 Days',
    description: 'Management portal certificate requires renewal.',
    severity: 'low',
    timestamp: '2026-05-19T12:00:00Z',
    tags: ['Security', 'TLS'],
    source: 'admin-portal',
    acknowledged: false,
  },
  {
    id: 'a5',
    title: 'Anomaly: Unusual DNS Query Volume',
    description: 'DNS queries 340% above baseline from subnet 192.168.50.0/24.',
    severity: 'high',
    timestamp: '2026-05-19T11:42:00Z',
    tags: ['DNS', 'Anomaly', 'Security'],
    source: 'dns-monitor',
    acknowledged: false,
  },
]

export const counterData: CounterData[] = [
  { id: 'c1', name: 'Total Packets', value: 4.2e9, unit: 'pkt', trend: [3.8, 3.9, 4.0, 4.1, 4.15, 4.18, 4.2] },
  { id: 'c2', name: 'TCP Flows', value: 890000, unit: 'flows', trend: [820, 840, 860, 870, 880, 885, 890] },
  { id: 'c3', name: 'UDP Datagrams', value: 1.1e6, unit: 'dgram', trend: [0.9, 0.95, 1.0, 1.02, 1.05, 1.08, 1.1] },
  { id: 'c4', name: 'Dropped Packets', value: 1240, unit: 'pkt', trend: [800, 900, 1000, 1100, 1150, 1200, 1240] },
]

export const retroTrendData = [
  { time: '00:00', bytes: 120, packets: 450 },
  { time: '02:00', bytes: 95, packets: 380 },
  { time: '04:00', bytes: 80, packets: 320 },
  { time: '06:00', bytes: 110, packets: 410 },
  { time: '08:00', bytes: 180, packets: 620 },
  { time: '10:00', bytes: 220, packets: 780 },
  { time: '12:00', bytes: 250, packets: 890 },
  { time: '14:00', bytes: 240, packets: 850 },
  { time: '16:00', bytes: 210, packets: 760 },
  { time: '18:00', bytes: 195, packets: 700 },
  { time: '20:00', bytes: 170, packets: 620 },
  { time: '22:00', bytes: 140, packets: 520 },
]

export const retroTrafficTable = [
  { protocol: 'TCP', src: '10.0.1.50', dst: '8.8.8.8', bytes: '2.4 GB', packets: '1.2M' },
  { protocol: 'UDP', src: '10.0.2.30', dst: '1.1.1.1', bytes: '890 MB', packets: '450K' },
  { protocol: 'TCP', src: '10.0.3.15', dst: '52.0.0.0', bytes: '1.1 GB', packets: '680K' },
  { protocol: 'ICMP', src: '10.0.1.1', dst: '10.0.2.1', bytes: '12 MB', packets: '8.2K' },
  { protocol: 'TCP', src: '192.168.1.100', dst: '10.0.5.20', bytes: '3.2 GB', packets: '2.1M' },
]

export const sessionsData: SessionRow[] = Array.from({ length: 50 }, (_, i) => ({
  id: `sess-${i + 1}`,
  protocol: ['TCP', 'UDP', 'ICMP', 'GRE'][i % 4],
  sourceIp: `10.0.${(i % 5) + 1}.${(i % 254) + 1}`,
  destinationIp: `203.0.${(i % 10) + 1}.${(i % 200) + 1}`,
  sourcePort: 1024 + (i % 60000),
  destPort: [80, 443, 53, 22, 8080][i % 5],
  router: `router-${(i % 3) + 1}`,
  volume: `${(Math.random() * 500 + 10).toFixed(1)} MB`,
  duration: `${Math.floor(Math.random() * 3600)}s`,
  tags: i % 3 === 0 ? ['suspicious'] : i % 5 === 0 ? ['encrypted', 'east'] : ['normal'],
}))

export const probes: Probe[] = [
  { id: 'p1', name: 'probe-nyc-01', status: 'online', location: 'New York' },
  { id: 'p2', name: 'probe-lon-02', status: 'online', location: 'London' },
  { id: 'p3', name: 'probe-sgp-03', status: 'degraded', location: 'Singapore' },
  { id: 'p4', name: 'probe-fra-04', status: 'offline', location: 'Frankfurt' },
]

export const notifications: NotificationItem[] = [
  {
    id: 'n0',
    title: 'BGP Session Down — AS64512',
    message: 'Critical peering loss on core-router-01.',
    type: 'error',
    priority: 'critical',
    timestamp: '2 min ago',
    read: false,
  },
  {
    id: 'n1',
    title: 'License expiring soon',
    message: 'Enterprise license expires in 30 days.',
    type: 'warning',
    priority: 'medium',
    timestamp: '10 min ago',
    read: false,
  },
  {
    id: 'n2',
    title: 'Probe reconnected',
    message: 'probe-lon-02 is back online.',
    type: 'success',
    priority: 'low',
    timestamp: '25 min ago',
    read: false,
  },
  {
    id: 'n4',
    title: 'High CPU on edge-fw-02',
    message: 'CPU above 85% for 15 minutes.',
    type: 'error',
    priority: 'high',
    timestamp: '32 min ago',
    read: false,
  },
  {
    id: 'n3',
    title: 'Scheduled maintenance',
    message: 'Database maintenance window tonight 02:00 UTC.',
    type: 'info',
    priority: 'low',
    timestamp: '1 hr ago',
    read: true,
  },
]

export const timeRanges = [
  { label: 'Last 15m', value: '15m' },
  { label: 'Last 1h', value: '1h' },
  { label: 'Last 6h', value: '6h' },
  { label: 'Last 24h', value: '24h' },
  { label: 'Last 7d', value: '7d' },
  { label: 'Custom', value: 'custom' },
]
