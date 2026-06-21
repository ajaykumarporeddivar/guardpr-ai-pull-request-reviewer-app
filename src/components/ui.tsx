import * as React from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

export function Button({
  className,
  variant = 'primary',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      className={cn(
        'inline-flex min-h-10 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900/20 disabled:pointer-events-none disabled:opacity-50',
        variant === 'primary' && 'bg-zinc-950 text-white hover:bg-zinc-800',
        variant === 'secondary' && 'border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50',
        variant === 'ghost' && 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950',
        variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700',
        className,
      )}
      {...props}
    />
  )
}

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-lg border border-zinc-200 bg-white p-5 shadow-sm', className)} {...props} />
}

export function Badge({ className, tone = 'neutral', ...props }: React.HTMLAttributes<HTMLSpanElement> & { tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
        tone === 'neutral' && 'bg-zinc-100 text-zinc-700',
        tone === 'success' && 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
        tone === 'warning' && 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
        tone === 'danger' && 'bg-red-50 text-red-700 ring-1 ring-red-200',
        tone === 'info' && 'bg-sky-50 text-sky-700 ring-1 ring-sky-200',
        className,
      )}
      {...props}
    />
  )
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn('w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-900/10 placeholder:text-zinc-400', className)} {...props} />
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn('min-h-24 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-900/10 placeholder:text-zinc-400', className)} {...props} />
}

export function StatCard({ label, value, detail, change, trend = 'up' }: { label: string; value: string | number; detail?: string; change?: string; trend?: 'up' | 'down' }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-zinc-500">{label}</p>
        {change && <Badge tone={trend === 'up' ? 'success' : 'info'}>{change}</Badge>}
      </div>
      <p className="mt-3 text-3xl font-black tracking-tight text-zinc-950">{value}</p>
      {detail && <p className="mt-2 text-sm leading-6 text-zinc-500">{detail}</p>}
    </Card>
  )
}

export function Modal({ open, children }: { open: boolean; children: React.ReactNode }) {
  if (!open) return null
  return <div className="fixed inset-0 z-50 grid place-items-center bg-zinc-950/50 p-4 backdrop-blur-sm">{children}</div>
}

export function Table({ className, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return <table className={cn('w-full border-collapse text-sm', className)} {...props} />
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center">
      <h3 className="text-base font-bold text-zinc-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
