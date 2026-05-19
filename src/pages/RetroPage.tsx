import { useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'
import { TrendChart } from '@/charts/TrendChart'
import { counterData, retroTrendData, retroTrafficTable } from '@/services/sampleData'
import { cn } from '@/utils/cn'

const tabs = ['Overview', 'By Protocol', 'By Host', 'By ASN', 'Custom']

export function RetroPage() {
  const [activeTab, setActiveTab] = useState('Overview')
  const [selectedCounter, setSelectedCounter] = useState(counterData[0].id)

  return (
    <div>
      <PageHeader
        title="Retro Counters"
        subtitle="Historical traffic analysis and counter trends"
        breadcrumbs={[{ label: 'Retro' }]}
      />

      {/* Counter selectors — wrap on mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {counterData.map((counter) => (
          <button
            key={counter.id}
            type="button"
            onClick={() => setSelectedCounter(counter.id)}
            className={cn(
              'rounded-xl border p-3 text-left transition-all',
              selectedCounter === counter.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-sm'
                : 'border-slate-200 dark:border-slate-700 hover:border-primary-300',
            )}
          >
            <p className="text-xs text-slate-500">{counter.name}</p>
            <p className="text-lg font-bold text-heading mt-1">
              {(counter.value / 1e6).toFixed(2)}M
              <span className="text-xs font-normal text-slate-400 ml-1">{counter.unit}</span>
            </p>
          </button>
        ))}
      </div>

      <Card padding="md" className="mb-6">
        <CardHeader>
          <CardTitle>Trend — {counterData.find((c) => c.id === selectedCounter)?.name}</CardTitle>
        </CardHeader>
        <TrendChart data={retroTrendData} />
      </Card>

      {/* Tabs — horizontally scrollable on mobile */}
      <div className="mb-4 overflow-x-auto scrollbar-thin -mx-1 px-1">
        <div className="flex gap-1 min-w-max border-b border-slate-200 dark:border-slate-700 pb-px">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg transition-colors',
                activeTab === tab
                  ? 'bg-primary-600 text-white'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200',
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <Card padding="none" className="overflow-hidden">
        <CardHeader className="px-4 pt-4">
          <CardTitle>Traffic Table — {activeTab}</CardTitle>
        </CardHeader>
        {/* Horizontal scroll table on mobile */}
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                {['Protocol', 'Source', 'Destination', 'Bytes', 'Packets'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-heading-table uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {retroTrafficTable.map((row, i) => (
                <tr key={i} className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-mono text-xs">{row.protocol}</td>
                  <td className="px-4 py-3 font-mono text-xs">{row.src}</td>
                  <td className="px-4 py-3 font-mono text-xs">{row.dst}</td>
                  <td className="px-4 py-3">{row.bytes}</td>
                  <td className="px-4 py-3">{row.packets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
