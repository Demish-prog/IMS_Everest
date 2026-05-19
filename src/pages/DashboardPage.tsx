import { ArrowDown, ArrowUp, Download, RefreshCw } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { StatusPill } from '@/components/ui/Badge'
import { MiniAreaChart } from '@/charts/MiniAreaChart'
import { TrafficChart } from '@/charts/TrafficChart'
import { kpiMetrics, topDevices, trafficSummary } from '@/services/sampleData'
import { cn } from '@/utils/cn'

export function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Network Overview"
        subtitle="Real-time traffic analytics and infrastructure health"
        breadcrumbs={[{ label: 'Dashboards' }, { label: 'Overview' }]}
        actions={
          <>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button variant="primary" size="sm" className="w-full sm:w-auto">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </>
        }
      />

      {/* Responsive KPI grid:
          1 column on mobile
          2 on tablet (md)
          4 on desktop (xl)
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {kpiMetrics.map((kpi) => (
          <Card key={kpi.id} hover padding="md">
            <CardHeader>
              <CardTitle>{kpi.label}</CardTitle>
              {kpi.status && <StatusPill status={kpi.status} />}
            </CardHeader>
            <p
              className="text-2xl font-bold text-heading mb-1"
              style={{ fontSize: 'clamp(1.25rem, 1rem + 0.5vw, 1.75rem)' }}
            >
              {kpi.value}
            </p>
            {kpi.change != null && (
              <p
                className={cn(
                  'flex items-center gap-1 text-xs font-medium mb-3',
                  kpi.trend === 'up' ? 'text-emerald-600' : kpi.trend === 'down' ? 'text-red-500' : 'text-slate-500',
                )}
              >
                {kpi.trend === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                {Math.abs(kpi.change)}% {kpi.changeLabel}
              </p>
            )}
            {kpi.sparkline && <MiniAreaChart data={kpi.sparkline} />}
          </Card>
        ))}
      </div>

      {/* Charts + devices: stack on mobile, 2-col on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2" padding="md">
          <CardHeader>
            <CardTitle>Traffic Summary</CardTitle>
          </CardHeader>
          <TrafficChart data={trafficSummary} />
        </Card>

        <Card padding="md">
          <CardHeader>
            <CardTitle>Top Devices</CardTitle>
          </CardHeader>
          <ul className="space-y-3">
            {topDevices.map((device, i) => (
              <li
                key={device.id}
                className="flex items-center justify-between gap-2 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/40 text-xs font-bold text-primary-700 dark:text-primary-300">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-heading-secondary truncate">{device.name}</p>
                    <p className="text-xs text-slate-500 font-mono">{device.ip}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-medium">{device.traffic}</p>
                  <StatusPill status={device.status} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
