// Analytics stub — replace with PostHog/Mixpanel/Plausible in production
// All events are localStorage-buffered in demo mode

type EventName =
  | 'page_view'
  | 'feature_used'
  | 'upgrade_prompt_shown'
  | 'upgrade_cta_clicked'
  | 'export_triggered'
  | 'entity_created'
  | 'entity_updated'
  | 'search_performed'
  | 'demo_completed'
  | string

interface AnalyticsEvent {
  name: EventName
  properties?: Record<string, string | number | boolean>
  timestamp: string
}

const BUFFER_KEY = 'nexus_analytics_buffer'
const MAX_BUFFER = 100

function getBuffer(): AnalyticsEvent[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(BUFFER_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function track(name: EventName, properties?: Record<string, string | number | boolean>): void {
  if (typeof window === 'undefined') return
  const event: AnalyticsEvent = { name, properties, timestamp: new Date().toISOString() }
  const buffer = getBuffer()
  buffer.push(event)
  if (buffer.length > MAX_BUFFER) buffer.shift()
  try { localStorage.setItem(BUFFER_KEY, JSON.stringify(buffer)) } catch { /* storage full */ }
  // In production: posthog.capture(name, properties) or window.analytics.track(name, properties)
}

export function getSessionEvents(): AnalyticsEvent[] {
  return getBuffer()
}

export function clearAnalytics(): void {
  if (typeof window !== 'undefined') localStorage.removeItem(BUFFER_KEY)
}