import { Play, Square } from 'lucide-react'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { StatusPill } from '@/components/ui/Badge'
import { probes } from '@/services/sampleData'
import { useNotificationStore } from '@/store/useNotificationStore'

export function AdminOverview() {
  const { addToast } = useNotificationStore()

  return (
    <div>
      <h1 className="text-2xl font-bold text-heading mb-1">Admin Overview</h1>
      <p className="text-sm text-slate-500 mb-6">System configuration and probe management</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card padding="md">
          <p className="text-sm text-slate-500">Active Probes</p>
          <p className="text-3xl font-bold mt-1">{probes.filter((p) => p.status === 'online').length}</p>
        </Card>
        <Card padding="md">
          <p className="text-sm text-slate-500">Degraded</p>
          <p className="text-3xl font-bold text-amber-500 mt-1">
            {probes.filter((p) => p.status === 'degraded').length}
          </p>
        </Card>
        <Card padding="md">
          <p className="text-sm text-slate-500">Offline</p>
          <p className="text-3xl font-bold text-red-500 mt-1">
            {probes.filter((p) => p.status === 'offline').length}
          </p>
        </Card>
      </div>

      <Card padding="md">
        <CardHeader>
          <CardTitle>Probe Status</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[500px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-2 px-3 text-xs font-semibold text-heading-table">Probe</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-heading-table">Location</th>
                <th className="text-left py-2 px-3 text-xs font-semibold text-heading-table">Status</th>
                <th className="text-right py-2 px-3 text-xs font-semibold text-heading-table">Actions</th>
              </tr>
            </thead>
            <tbody>
              {probes.map((probe) => (
                <tr key={probe.id} className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-3 px-3 font-medium text-heading-secondary">{probe.name}</td>
                  <td className="py-3 px-3 text-slate-500">{probe.location}</td>
                  <td className="py-3 px-3">
                    <StatusPill status={probe.status === 'online' ? 'online' : probe.status} />
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          addToast({ title: 'Probe started', message: `${probe.name} is starting...`, type: 'success' })
                        }
                      >
                        <Play className="h-3 w-3" />
                        Start
                      </Button>
                      <Button variant="danger" size="sm">
                        <Square className="h-3 w-3" />
                        Stop
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
