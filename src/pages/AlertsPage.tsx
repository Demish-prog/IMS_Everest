import { Check, Eye, MoreVertical, X } from 'lucide-react'
import * as Icons from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { alertsData } from '@/services/sampleData'
import { useModalStore } from '@/store/useModalStore'
import type { AlertItem, Severity } from '@/types'
import { cn } from '@/utils/cn'

const severityIcons: Record<Severity, keyof typeof Icons> = {
  critical: 'AlertOctagon',
  high: 'AlertTriangle',
  medium: 'AlertCircle',
  low: 'Info',
  info: 'Info',
}

const severityColors: Record<Severity, string> = {
  critical: 'text-red-500 bg-red-50 dark:bg-red-900/20',
  high: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20',
  medium: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20',
  low: 'text-slate-500 bg-slate-50 dark:bg-slate-800',
  info: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
}

function AlertCard({ alert }: { alert: AlertItem }) {
  const Icon = Icons[severityIcons[alert.severity]] as React.ComponentType<{ className?: string }>

  return (
    <Card
      className={cn('border-l-4', {
        'border-l-red-500': alert.severity === 'critical',
        'border-l-orange-500': alert.severity === 'high',
        'border-l-amber-500': alert.severity === 'medium',
        'border-l-slate-400': alert.severity === 'low',
        'border-l-blue-500': alert.severity === 'info',
      })}
      padding="md"
      hover
    >
      <div className="flex gap-3">
        <div className={cn('rounded-lg p-2 h-fit flex-shrink-0', severityColors[alert.severity])}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3 className="font-semibold text-sm md:text-base text-heading-secondary">{alert.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {new Date(alert.timestamp).toLocaleString()} · {alert.source}
              </p>
            </div>
            <Badge variant={alert.severity}>{alert.severity}</Badge>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">{alert.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {alert.tags.map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Button variant="outline" size="sm">
              <Eye className="h-3 w-3" />
              View
            </Button>
            {!alert.acknowledged && (
              <Button variant="secondary" size="sm">
                <Check className="h-3 w-3" />
                Acknowledge
              </Button>
            )}
            <Button variant="ghost" size="sm">
              <X className="h-3 w-3" />
              Dismiss
            </Button>
            <Button variant="ghost" size="sm" aria-label="More actions">
              <MoreVertical className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export function AlertsPage() {
  const { openModal } = useModalStore()
  const criticalCount = alertsData.filter((a) => a.severity === 'critical').length
  const unackedCount = alertsData.filter((a) => !a.acknowledged).length

  return (
    <div>
      <PageHeader
        title="Alerts"
        subtitle="Active incidents and anomaly detections"
        breadcrumbs={[{ label: 'Alerts' }]}
        actions={
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            onClick={() =>
              openModal({
                title: 'Alert Rules',
                content: <p className="text-sm text-slate-600">Configure alert thresholds and notification channels.</p>,
              })
            }
          >
            Configure Rules
          </Button>
        }
      />

      {/* Responsive: sidebar moves below alerts on mobile (xl breakpoint) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-4">
          {alertsData.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>

        <aside className="space-y-4">
          <Card padding="md">
            <h3 className="font-semibold text-heading-card mb-4">Alert Summary</h3>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-slate-500">Total Open</dt>
                <dd className="font-bold text-heading">{alertsData.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-slate-500">Critical</dt>
                <dd className="font-bold text-red-500">{criticalCount}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-slate-500">Unacknowledged</dt>
                <dd className="font-bold text-amber-500">{unackedCount}</dd>
              </div>
            </dl>
          </Card>

          <Card padding="md">
            <h3 className="font-semibold text-heading-card mb-3">By Severity</h3>
            {(['critical', 'high', 'medium', 'low'] as const).map((sev) => {
              const count = alertsData.filter((a) => a.severity === sev).length
              return (
                <div key={sev} className="flex items-center gap-2 mb-2">
                  <Badge variant={sev}>{sev}</Badge>
                  <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full transition-all"
                      style={{ width: `${(count / alertsData.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-6 text-right">{count}</span>
                </div>
              )
            })}
          </Card>
        </aside>
      </div>
    </div>
  )
}
