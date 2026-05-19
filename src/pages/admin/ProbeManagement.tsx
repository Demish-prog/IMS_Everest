import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { probes } from '@/services/sampleData'
import { StatusPill } from '@/components/ui/Badge'

export function ProbeManagement() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-heading">Probe Management</h1>
          <p className="text-sm text-slate-500">Deploy and configure network probes</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Add Probe
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {probes.map((probe) => (
          <Card key={probe.id} padding="md" hover>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-heading-secondary">{probe.name}</h3>
                <p className="text-sm text-slate-500">{probe.location}</p>
              </div>
              <StatusPill status={probe.status === 'online' ? 'online' : probe.status} />
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">
                Configure
              </Button>
              <Button variant="ghost" size="sm">
                Logs
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
