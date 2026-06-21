'use client'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Switch } from '@/components/ui'
import { AppHeader } from '@/components/layout'
import { formatDate } from '@/lib/utils' // Assuming formatDate exists, no formatCurrency needed
import { MOCK_TEAMS, MOCK_CUSTOM_RULES, MOCK_PR_REVIEWS } from '@/lib/data'
import { Search, Plus, Download, Eye, Github } from 'lucide-react'
import { Severity, IssueType, CustomRuleCategory, ReviewStatus } from '@/lib/types'
import { cn } from '@/components/ui'

export default function FeaturePage() {
  const params = useParams()
  const slug = (params.feature as string) ?? ''
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('') // Used for review-history
  const [categoryFilter, setCategoryFilter] = useState('') // Used for custom-rules
  const [selected, setSelected] = useState<string | null>(null) // For row expansion/detail

  // Helper for status badges
  const getStatusBadge = (status: ReviewStatus | CustomRuleCategory | Severity) => {
    let classes = 'text-xs font-medium px-2.5 py-0.5 rounded-full'
    switch (status) {
      case 'completed':
      case 'security':
      case 'high':
      case 'critical':
        classes = cn(classes, 'bg-emerald-50 text-emerald-600 border border-emerald-200')
        break
      case 'pending':
      case 'performance':
      case 'medium':
        classes = cn(classes, 'bg-amber-50 text-amber-600 border border-amber-200')
        break
      case 'failed':
      case 'code_quality':
      case 'low':
      case 'best_practice':
        classes = cn(classes, 'bg-red-50 text-red-600 border border-red-200')
        break
      default:
        classes = cn(classes, 'bg-zinc-50 text-zinc-600 border border-zinc-200')
    }
    return <span className={classes}>{status.replace('_', ' ')}</span>
  }

  // Helper for Severity selectors
  const severityOptions: Severity[] = ['low', 'medium', 'high', 'critical']

  // ── Feature 1: GuardPR Settings ──
  if (slug === 'settings') {
    const team = MOCK_TEAMS[0] // Assuming one team for MVP
    const [teamSettings, setTeamSettings] = useState(team || {
      id: '', createdAt: '', updatedAt: '', name: 'Default Team', githubInstallationId: null, learningEnabled: false,
      severityThresholds: { security: 'medium', performance: 'medium', code_quality: 'medium', custom: 'medium' },
      customRulesCount: 0, lastPrReviewAt: null, planId: 'free'
    })

    const handleSettingChange = (key: keyof typeof teamSettings | IssueType, value: any, isSeverity?: boolean) => {
      if (isSeverity) {
        setTeamSettings(prev => ({
          ...prev,
          severityThresholds: {
            ...prev.severityThresholds,
            [key as IssueType]: value,
          },
        }))
      } else {
        setTeamSettings(prev => ({ ...prev, [key as keyof typeof teamSettings]: value }))
      }
    }

    const saveSettings = () => {
      alert('Settings saved! (Demo only)')
      // In a real app, this would dispatch an API call to update team settings
    }

    return (
      <div className="space-y-6">
        <AppHeader
          title="GuardPR Settings"
          subtitle="Configure how GuardPR reviews your pull requests."
          actions={<Button size="sm" onClick={saveSettings}>Save Changes</Button>}
        />
        <Card>
          <CardHeader>
            <CardTitle>Team & Integration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label htmlFor="teamName" className="block text-sm font-medium text-zinc-700">Team Name</label>
              <input
                id="teamName"
                type="text"
                value={teamSettings.name}
                onChange={(e) => handleSettingChange('name', e.target.value)}
                className="mt-1 block w-full max-w-sm px-3 py-2 border border-zinc-200 rounded-md shadow-sm focus:outline-none focus:ring-zinc-900/10 focus:border-zinc-900/10 sm:text-sm"
              />
            </div>
            <div className="flex items-center justify-between py-2 border-t border-zinc-100">
              <div className="flex items-center gap-2">
                <Github size={18} className="text-zinc-600" />
                <div>
                  <h4 className="text-sm font-medium text-zinc-900">GitHub Integration</h4>
                  <p className="text-sm text-zinc-500">
                    {teamSettings.githubInstallationId ? `Connected to GitHub (ID: ${teamSettings.githubInstallationId})` : 'Not connected'}
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="ml-auto">
                {teamSettings.githubInstallationId ? 'Manage Integration' : 'Connect GitHub'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Learning & Review Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <div>
                <h4 className="text-sm font-medium text-zinc-900">Enable AI Learning</h4>
                <p className="text-sm text-zinc-500">GuardPR learns from your merged PRs to adapt to your team's coding style.</p>
              </div>
              <Switch
                checked={teamSettings.learningEnabled}
                onCheckedChange={(checked) => handleSettingChange('learningEnabled', checked)}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-zinc-900">Severity Thresholds</h3>
              <p className="text-sm text-zinc-500">Set the minimum severity for issues to be flagged by category.</p>
              {Object.entries(teamSettings.severityThresholds).map(([issueType, severity]) => (
                <div key={issueType} className="flex items-center justify-between">
                  <span className="text-sm text-zinc-700 capitalize">{issueType.replace('_', ' ')}:</span>
                  <select
                    value={severity}
                    onChange={(e) => handleSettingChange(issueType as IssueType, e.target.value as Severity, true)}
                    className="px-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white focus:outline-none"
                  >
                    {severityOptions.map(option => (
                      <option key={option} value={option} className="capitalize">{option}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ── Feature 2: Custom Rules ──
  if (slug === 'custom-rules') {
    const items = MOCK_CUSTOM_RULES.filter(rule =>
      (!search || rule.name.toLowerCase().includes(search.toLowerCase()) || rule.description.toLowerCase().includes(search.toLowerCase())) &&
      (!categoryFilter || rule.category === categoryFilter)
    )

    return (
      <div className="space-y-6">
        <AppHeader
          title="Custom Rules"
          subtitle={`${items.length} custom rules configured`}
          actions={<Button size="sm"><Plus size={14} className="mr-1" />New Custom Rule</Button>}
        />
        <Card>
          <CardHeader>
            <div className="flex gap-3">
              <div className="relative flex-1 max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search custom rules..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="px-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white focus:outline-none"
              >
                <option value="">All Categories</option>
                <option value="security">Security</option>
                <option value="performance">Performance</option>
                <option value="code_quality">Code Quality</option>
                <option value="best_practice">Best Practice</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-zinc-100">
                  <tr className="text-left text-zinc-500 text-xs uppercase tracking-wide">
                    <th className="px-6 py-3">Rule Name</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Severity</th>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-4 text-center text-zinc-500">No custom rules found.</td>
                    </tr>
                  ) : (
                    items.map(rule => (
                      <tr
                        key={rule.id}
                        className="hover:bg-zinc-50 cursor-pointer"
                        onClick={() => setSelected(selected === rule.id ? null : rule.id)}
                      >
                        <td className="px-6 py-3 font-medium text-zinc-900">{rule.name}</td>
                        <td className="px-6 py-3">{getStatusBadge(rule.category)}</td>
                        <td className="px-6 py-3">{getStatusBadge(rule.severity)}</td>
                        <td className="px-6 py-3 text-zinc-600 max-w-sm overflow-hidden text-ellipsis whitespace-nowrap">{rule.description}</td>
                        <td className="px-6 py-3 text-right">
                          <Button variant="ghost" size="sm" icon={<Eye size={16} />} aria-label="View Rule" />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ── Feature 3: Review History ──
  if (slug === 'review-history') {
    const items = MOCK_PR_REVIEWS.filter(review =>
      (!search || review.title.toLowerCase().includes(search.toLowerCase()) || review.repository.toLowerCase().includes(search.toLowerCase())) &&
      (!statusFilter || review.status === statusFilter)
    )

    return (
      <div className="space-y-6">
        <AppHeader
          title="Review History"
          subtitle={`${items.length} PR reviews total`}
          actions={<Button size="sm"><Download size={14} className="mr-1" />Export Reviews</Button>}
        />
        <Card>
          <CardHeader>
            <div className="flex gap-3">
              <div className="relative flex-1 max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search PRs by title or repo..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-2 text-sm border border-zinc-200 rounded-lg bg-white focus:outline-none"
              >
                <option value="">All statuses</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-zinc-100">
                  <tr className="text-left text-zinc-500 text-xs uppercase tracking-wide">
                    <th className="px-6 py-3">Title</th>
                    <th className="px-6 py-3">Repository</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Issues</th>
                    <th className="px-6 py-3">Review Date</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-4 text-center text-zinc-500">No PR reviews found.</td>
                    </tr>
                  ) : (
                    items.map(item => (
                      <tr
                        key={item.id}
                        className="hover:bg-zinc-50 cursor-pointer"
                        onClick={() => setSelected(selected === item.id ? null : item.id)}
                      >
                        <td className="px-6 py-3 font-medium text-zinc-900 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">{item.title}</td>
                        <td className="px-6 py-3 text-zinc-600">{item.repository}</td>
                        <td className="px-6 py-3">{getStatusBadge(item.status)}</td>
                        <td className="px-6 py-3 text-zinc-600">{item.totalIssues}</td>
                        <td className="px-6 py-3 text-zinc-600">{formatDate(item.submittedAt)}</td>
                        <td className="px-6 py-3 text-right">
                          <Button variant="ghost" size="sm" icon={<Eye size={16} />} aria-label="View Review" />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Fallback for unknown slugs or initial load
  return (
    <div className="flex flex-col items-center justify-center h-full text-zinc-500">
      <h2 className="text-xl font-bold text-zinc-800 mb-2">Welcome to GuardPR Dashboard</h2>
      <p className="mb-6">Select a feature from the sidebar to get started.</p>
      <div className="flex space-x-4">
        <Button asChild>
          <a href="/dashboard/settings">GuardPR Settings</a>
        </Button>
        <Button asChild variant="secondary">
          <a href="/dashboard/custom-rules">Custom Rules</a>
        </Button>
        <Button asChild variant="secondary">
          <a href="/dashboard/review-history">Review History</a>
        </Button>
      </div>
    </div>
  )
}