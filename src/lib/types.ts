export type SortDir = 'asc' | 'desc';
export type ApiResponse<T> = { ok: boolean; data?: T; error?: string };

export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type IssueType = 'security' | 'performance' | 'code_quality' | 'custom';
export type ReviewStatus = 'pending' | 'completed' | 'failed';
export type CustomRuleCategory = 'security' | 'performance' | 'code_quality' | 'best_practice';

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  avatar: string;
  joinedAt: string;
}

export interface TeamMember {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  avatar: string;
}

export interface Team {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  githubInstallationId: string | null;
  members: TeamMember[];
  settings: TeamSettings;
}

export interface TeamSettings {
  severityThresholds: {
    security: Severity;
    performance: Severity;
    codeQuality: Severity;
    custom: Severity;
  };
  mutedRuleCategories: IssueType[];
  customRulesEnabled: boolean;
}

export interface PullRequest {
  id: string;
  repo: string;
  prNumber: number;
  title: string;
  author: string;
  status: 'open' | 'merged' | 'closed';
  createdAt: string;
  updatedAt: string;
  reviewStatus: ReviewStatus;
  issueCount: number;
  severitySummary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export interface Issue {
  id: string;
  prId: string;
  ruleId: string; // Refers to a predefined or custom rule
  type: IssueType;
  severity: Severity;
  title: string;
  description: string;
  filePath: string;
  lineNumber: number;
  suggestedFix: string;
  codeSnippet: string;
  status: 'open' | 'fixed' | 'dismissed';
  identifiedAt: string;
}

export interface Rule {
  id: string;
  name: string;
  category: IssueType;
  description: string;
  defaultSeverity: Severity;
  active: boolean;
  isCustom: boolean;
}

export interface CustomRule extends Rule {
  teamId: string;
  definition: string; // Plain English description of the rule
}

export interface ReviewComment {
  id: string;
  issueId: string;
  comment: string;
  reviewerId: string;
  createdAt: string;
}

export interface Review {
  id: string;
  prId: string;
  reviewerId: string; // GuardPR AI's internal ID
  status: ReviewStatus;
  startedAt: string;
  completedAt: string | null;
  issues: Issue[];
  summary: string;
}

export interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number; // e.g., percentage change from previous period
  trend: 'up' | 'down' | 'neutral';
}