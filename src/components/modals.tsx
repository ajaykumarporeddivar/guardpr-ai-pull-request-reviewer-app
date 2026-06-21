'use client'

import { Button, Card, Input, Modal, Textarea } from '@/components/ui'

export function EntityDetailModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open}>
      <Card className="w-full max-w-lg">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Workflow detail</p>
        <h2 className="mt-2 text-xl font-black text-zinc-950">Review buyer-ready handoff</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-500">Approve the next step, return it to review, or capture a blocker before the client package is released.</p>
        <Textarea className="mt-4" placeholder="Decision notes..." />
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Button type="button" onClick={onClose}>Approve handoff</Button>
          <Button type="button" variant="secondary" onClick={onClose}>Return to review</Button>
        </div>
      </Card>
    </Modal>
  )
}

export function ConfirmModal({ open, onConfirm, onClose }: { open: boolean; onConfirm: () => void; onClose: () => void }) {
  return (
    <Modal open={open}>
      <Card className="w-full max-w-md">
        <h2 className="text-lg font-black text-zinc-950">Confirm workflow action</h2>
        <p className="mt-2 text-sm text-zinc-500">This updates the local workflow state and prepares the record for API persistence.</p>
        <div className="mt-4 flex gap-2">
          <Button type="button" onClick={onConfirm}>Confirm</Button>
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
        </div>
      </Card>
    </Modal>
  )
}

export function CommandPalette({ open = false, onClose = () => {} }: { open?: boolean; onClose?: () => void }) {
  return (
    <Modal open={open}>
      <Card className="w-full max-w-xl">
        <h2 className="text-lg font-black text-zinc-950">Command palette</h2>
        <Input className="mt-4" placeholder="Search workflows, reports, risk reviews..." />
        <div className="mt-4 grid gap-2">
          {['Open blocked workflows', 'Export board summary', 'Create client proof pack'].map(item => (
            <button key={item} type="button" className="rounded-lg border border-zinc-200 px-3 py-2 text-left text-sm font-medium hover:bg-zinc-50" onClick={onClose}>{item}</button>
          ))}
        </div>
      </Card>
    </Modal>
  )
}
