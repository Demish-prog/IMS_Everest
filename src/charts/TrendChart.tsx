import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface TrendChartProps {
  data: { time: string; bytes: number; packets: number }[]
}

/** Retro counters trend chart — full width responsive */
export function TrendChart({ data }: TrendChartProps) {
  return (
    <div className="h-56 sm:h-64 md:h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
          <XAxis dataKey="time" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
          <YAxis yAxisId="left" tick={{ fontSize: 10 }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="bytes" stroke="#0d7377" strokeWidth={2} dot={false} name="Bytes (GB)" />
          <Line yAxisId="right" type="monotone" dataKey="packets" stroke="#3b82f6" strokeWidth={2} dot={false} name="Packets (K)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
