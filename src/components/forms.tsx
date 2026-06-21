'use client'

import { useState } from 'react'
import { Button, Card, Input, Textarea } from '@/components/ui'

export function SearchAndFilter({ onSearch }: { onSearch?: (value: string) => void }) {
  const [query, setQuery] = useState('')
  return (
    <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
      <Input value={query} onChange={event => { setQuery(event.target.value); onSearch?.(event.target.value) }} placeholder="Search workflows, customers, owners..." />
      <Button type="button" variant="secondary">Apply filter</Button>
    </div>
  )
}

export function CreateEntityForm() {
  const [name, setName] = useState('')
  const [owner, setOwner] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const hasError = submitted && (!name.trim() || !owner.trim())
  return (
    <Card>
      <form className="space-y-4" onSubmit={event => { event.preventDefault(); setSubmitted(true) }}>
        <div className="grid gap-3 md:grid-cols-2">
          <Input value={name} onChange={event => setName(event.target.value)} placeholder="Workflow name" />
          <Input value={owner} onChange={event => setOwner(event.target.value)} placeholder="Owner" />
        </div>
        <Textarea value={notes} onChange={event => setNotes(event.target.value)} placeholder="Describe customer context, blocker, and expected next step..." />
        {hasError && <p className="text-sm font-medium text-red-600">Workflow name and owner are required.</p>}
        {submitted && !hasError && <p className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-700">Workflow saved locally and ready for production API wiring.</p>}
        <Button type="submit">Create workflow</Button>
      </form>
    </Card>
  )
}

export function ExportButton() {
  const [exported, setExported] = useState(false)
  const handleExport = () => {
    const csv = 'workflow,status,owner,value\nEnterprise approval desk,approved,Avery Shah,82000\nRenewal risk triage,in_review,Mina Patel,64000'
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'professional-workflows.csv'
    link.click()
    URL.revokeObjectURL(url)
    setExported(true)
    window.setTimeout(() => setExported(false), 2000)
  }
  return <Button type="button" variant="secondary" onClick={handleExport}>{exported ? 'Export ready' : 'Export CSV'}</Button>
}
