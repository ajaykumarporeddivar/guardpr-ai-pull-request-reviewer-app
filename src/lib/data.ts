import type { ActivityEvent, DemoMetric, DemoRecord, NavItem } from './types'

export const metrics: DemoMetric[] = [
  { id: 'pipeline', label: 'Pipeline Value', value: '$486K', change: '+18.4%', trend: 'up', detail: 'Expansion-ready value this quarter' },
  { id: 'approval', label: 'Approval Rate', value: '91%', change: '+7.2%', trend: 'up', detail: 'Decisions completed without escalation' },
  { id: 'cycle', label: 'Cycle Time', value: '2.1d', change: '-31%', trend: 'down', detail: 'Median time from intake to decision' },
  { id: 'risk', label: 'Risk Removed', value: '36', change: '+11', trend: 'up', detail: 'Exceptions closed before handoff' },
]

export const records: DemoRecord[] = [
  { id: 'rec_001', name: 'Enterprise approval desk', customer: 'Northstar Ventures', status: 'approved', owner: 'Avery Shah', value: 82000, priority: 'high', confidence: 96, cycleTime: '1.8d', nextStep: 'Send executive proof pack', notes: 'Legal, finance, and success evidence reconciled for buyer review.', createdAt: '2026-05-01' },
  { id: 'rec_002', name: 'Renewal risk triage', customer: 'Atlas Commerce', status: 'in_review', owner: 'Mina Patel', value: 64000, priority: 'high', confidence: 88, cycleTime: '2.4d', nextStep: 'Resolve discount exception', notes: 'Pricing mismatch detected between signed order and CRM renewal record.', createdAt: '2026-05-03' },
  { id: 'rec_003', name: 'Campaign proof package', customer: 'Signal Labs', status: 'queued', owner: 'Jordan Lee', value: 41000, priority: 'medium', confidence: 81, cycleTime: '3.0d', nextStep: 'Attach final KPI export', notes: 'Client-ready report needs final attribution and narrative summary.', createdAt: '2026-05-04' },
  { id: 'rec_004', name: 'Revenue leakage review', customer: 'BrightPath Health', status: 'blocked', owner: 'Priya Raman', value: 53000, priority: 'high', confidence: 72, cycleTime: '4.6d', nextStep: 'Escalate missing approval', notes: 'Two approval artifacts missing from procurement thread.', createdAt: '2026-05-06' },
  { id: 'rec_005', name: 'Expansion qualification', customer: 'LedgerWorks', status: 'approved', owner: 'Noah Kim', value: 78000, priority: 'high', confidence: 94, cycleTime: '1.5d', nextStep: 'Book paid roadmap session', notes: 'Usage threshold and buyer intent both crossed expansion trigger.', createdAt: '2026-05-08' },
  { id: 'rec_006', name: 'Implementation handoff', customer: 'Cobalt Supply', status: 'in_review', owner: 'Elena Moore', value: 36000, priority: 'medium', confidence: 86, cycleTime: '2.7d', nextStep: 'Confirm success criteria', notes: 'Delivery team needs acceptance criteria before sprint planning.', createdAt: '2026-05-09' },
  { id: 'rec_007', name: 'Compliance evidence vault', customer: 'Riverline Bank', status: 'queued', owner: 'Marcus Chen', value: 97000, priority: 'high', confidence: 79, cycleTime: '3.3d', nextStep: 'Normalize audit fields', notes: 'Audit evidence imported but field names are inconsistent.', createdAt: '2026-05-10' },
  { id: 'rec_008', name: 'QBR insight package', customer: 'Forge Retail', status: 'approved', owner: 'Ivy Torres', value: 28000, priority: 'low', confidence: 92, cycleTime: '1.9d', nextStep: 'Publish client portal link', notes: 'Commercial narrative, charts, and recommendations are complete.', createdAt: '2026-05-12' },
  { id: 'rec_009', name: 'SLA breach prevention', customer: 'Acme Logistics', status: 'in_review', owner: 'Sam Carter', value: 44000, priority: 'medium', confidence: 84, cycleTime: '2.9d', nextStep: 'Assign operations owner', notes: 'Three accounts approaching escalation threshold this week.', createdAt: '2026-05-13' },
  { id: 'rec_010', name: 'Buyer committee map', customer: 'Nova Analytics', status: 'queued', owner: 'Tara Singh', value: 57000, priority: 'medium', confidence: 77, cycleTime: '3.8d', nextStep: 'Validate stakeholder roles', notes: 'Champion identified two new procurement reviewers.', createdAt: '2026-05-14' },
  { id: 'rec_011', name: 'Invoice exception radar', customer: 'KiteWorks', status: 'blocked', owner: 'Owen Brooks', value: 39000, priority: 'high', confidence: 69, cycleTime: '5.1d', nextStep: 'Repair payment terms mismatch', notes: 'Invoice terms conflict with signed statement of work.', createdAt: '2026-05-15' },
  { id: 'rec_012', name: 'Partner launch cockpit', customer: 'Orbit Studios', status: 'approved', owner: 'Lena Park', value: 61000, priority: 'medium', confidence: 90, cycleTime: '2.0d', nextStep: 'Send launch summary', notes: 'Launch checklist cleared with sponsor, channel, and activation metrics.', createdAt: '2026-05-16' },
]

export const activity: ActivityEvent[] = [
  { id: 'evt_1', title: 'Executive proof pack approved', actor: 'Avery Shah', timestamp: '2026-05-23T10:30:00Z', status: 'approved' },
  { id: 'evt_2', title: 'Pricing exception sent to finance', actor: 'Mina Patel', timestamp: '2026-05-23T09:10:00Z', status: 'in_review' },
  { id: 'evt_3', title: 'Compliance evidence needs normalization', actor: 'Marcus Chen', timestamp: '2026-05-22T17:45:00Z', status: 'queued' },
  { id: 'evt_4', title: 'Payment terms mismatch blocked invoice', actor: 'Owen Brooks', timestamp: '2026-05-22T15:05:00Z', status: 'blocked' },
]

export const navItems: NavItem[] = [
  { label: 'Command Center', href: '/dashboard' },
  { label: 'Operating Queue', href: '/dashboard/operating-queue', badge: '12' },
  { label: 'Risk Review', href: '/dashboard/risk-review', badge: '2' },
  { label: 'Client Reports', href: '/dashboard/client-reports' },
  { label: 'Settings', href: '/dashboard/settings' },
]

export const STATS = metrics
export const KPI_STATS = metrics
export const DASHBOARD_STATS = metrics
