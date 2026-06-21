export function Sparkline({ values = [62, 68, 71, 77, 83, 88, 91] }: { values?: number[] }) {
  const max = Math.max(...values, 1)
  const points = values.map((value, index) => String((index / Math.max(values.length - 1, 1)) * 100) + ',' + String(40 - (value / max) * 36)).join(' ')
  return (
    <svg viewBox="0 0 100 44" className="h-14 w-full" role="img" aria-label="Trend chart">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-950" />
    </svg>
  )
}

export function BarChart({ values = [42, 55, 49, 71, 63, 86, 92] }: { values?: number[] }) {
  const max = Math.max(...values, 1)
  return (
    <div className="flex h-52 items-end gap-3 rounded-lg bg-zinc-50 p-4">
      {values.map((value, index) => (
        <div key={index} className="flex flex-1 flex-col items-center gap-2">
          <div className="w-full rounded-t-lg bg-zinc-950" style={{ height: String(Math.max(14, (value / max) * 100)) + '%' }} />
          <span className="text-xs font-medium text-zinc-500">W{index + 1}</span>
        </div>
      ))}
    </div>
  )
}

export function LineChart({ data = [20, 35, 28, 50, 42, 60, 55], color = '#18181b' }: { data?: number[]; labels?: string[]; color?: string }) {
  const max = Math.max(...data, 1)
  const points = data.map((value, index) => String((index / Math.max(data.length - 1, 1)) * 100) + ',' + String(56 - (value / max) * 52)).join(' ')
  return (
    <svg viewBox="0 0 100 60" className="h-32 w-full" role="img" aria-label="Line chart">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {data.map((value, index) => <circle key={index} cx={(index / Math.max(data.length - 1, 1)) * 100} cy={56 - (value / max) * 52} r="2" fill={color} />)}
    </svg>
  )
}

export function DonutChart({ value = 91 }: { value?: number }) {
  return (
    <div className="grid h-36 w-36 place-items-center rounded-full border-[16px] border-zinc-950 bg-white text-3xl font-black text-zinc-950 shadow-inner">
      {value}%
    </div>
  )
}
