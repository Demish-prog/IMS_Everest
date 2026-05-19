import { Download, Filter } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { SessionsTable } from '@/tables/SessionsTable'
import { sessionsData } from '@/services/sampleData'
import { useModalStore } from '@/store/useModalStore'

export function SessionsPage() {
  const { openModal } = useModalStore()

  return (
    <div>
      <PageHeader
        title="Netflow Sessions"
        subtitle="Live and historical flow records with advanced filtering"
        breadcrumbs={[{ label: 'Netflow' }, { label: 'Sessions' }]}
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto"
              onClick={() =>
                openModal({
                  title: 'Advanced Filters',
                  content: (
                    <div className="space-y-3 text-sm">
                      <p>Filter by protocol, IP range, port, or custom tags.</p>
                    </div>
                  ),
                  size: 'lg',
                })
              }
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="primary" size="sm" className="w-full sm:w-auto">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </>
        }
      />

      <SessionsTable data={sessionsData} />
    </div>
  )
}
