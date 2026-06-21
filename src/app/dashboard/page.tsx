import { BarChart, DonutChart, Sparkline } from '@/components/charts'
import { Badge, Card, StatCard, Table } from '@/components/ui'
import { activity, metrics, records } from '@/lib/data'
import { formatCurrency, formatDate } from '@/lib/utils'

const statusTone = {
  queued: 'info',
  in_review: 'warning',
  approved: 'success',
  blocked: 'danger',
} as const

export default function DashboardPage() {
  const highPriority = records.filter(record => record.priority === 'high').length
  const totalValue = records.reduce((sum, record) => sum + record.value, 0)

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500">Command center</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-zinc-950">Revenue workflow cockpit</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">Monitor buyer-critical workflows, exception risk, and handoff readiness from one professional operating view.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm sm:flex">
          <Card className="px-4 py-3"><p className="text-zinc-500">Priority items</p><p className="text-xl font-black">{highPriority}</p></Card>
          <Card className="px-4 py-3"><p className="text-zinc-500">Total value</p><p className="text-xl font-black">{formatCurrency(totalValue)}</p></Card>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map(metric => <StatCard key={metric.id} label={metric.label} value={metric.value} change={metric.change} trend={metric.trend} detail={metric.detail} />)}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-zinc-950">Throughput by week</h2>
              <p className="text-sm text-zinc-500">Approved workflows and blocked exceptions</p>
            </div>
            <Badge tone="success">Live model</Badge>
          </div>
          <div className="mt-6"><BarChart values={[42, 55, 49, 71, 63, 86, 92]} /></div>
        </Card>
        <Card>
          <h2 className="text-lg font-black text-zinc-950">Readiness score</h2>
          <div className="mt-5 flex items-center justify-center"><DonutChart value={91} /></div>
          <Sparkline values={[62, 68, 71, 77, 83, 88, 91]} />
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_0.8fr]">
        <Card className="overflow-hidden">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-black text-zinc-950">Active operating queue</h2>
            <Badge>{records.length} records</Badge>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <thead>
                <tr className="border-b border-zinc-200 text-left text-xs uppercase tracking-widest text-zinc-500">
                  <th className="pb-3">Workflow</th>
                  <th className="pb-3">Owner</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Value</th>
                  <th className="pb-3">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {records.slice(0, 7).map(record => (
                  <tr key={record.id} className="border-b border-zinc-100">
                    <td className="py-3 pr-4"><p className="font-semibold text-zinc-950">{record.name}</p><p className="text-xs text-zinc-500">{record.customer}</p></td>
                    <td className="py-3 pr-4 text-zinc-600">{record.owner}</td>
                    <td className="py-3 pr-4"><Badge tone={statusTone[record.status]}>{record.status.replace('_', ' ')}</Badge></td>
                    <td className="py-3 pr-4 font-semibold">{formatCurrency(record.value)}</td>
                    <td className="py-3 pr-4">{record.confidence}%</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-black text-zinc-950">Activity feed</h2>
          <div className="mt-4 space-y-4">
            {activity.map(event => (
              <div key={event.id} className="rounded-lg border border-zinc-200 p-3">
                <Badge tone={statusTone[event.status]}>{event.status.replace('_', ' ')}</Badge>
                <p className="mt-2 font-semibold text-zinc-950">{event.title}</p>
                <p className="text-xs text-zinc-500">{event.actor} · {formatDate(event.timestamp)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
