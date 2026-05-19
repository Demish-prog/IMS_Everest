import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface TrafficChartProps {
  data: { name: string; inbound: number; outbound: number }[]
}

/**
 * Traffic summary chart — ResponsiveContainer ensures charts resize on mobile/tablet.
 */
export function TrafficChart({ data }: TrafficChartProps) {
  return (
    <div className="h-64 sm:h-72 md:h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="inbound" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d7377" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#0d7377" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="outbound" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} unit=" Gbps" />
          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid var(--color-sidebar-border)',
            }}
          />
          <Legend />
          <Area type="monotone" dataKey="inbound" stroke="#0d7377" fill="url(#inbound)" name="Inbound" />
          <Area type="monotone" dataKey="outbound" stroke="#3b82f6" fill="url(#outbound)" name="Outbound" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
