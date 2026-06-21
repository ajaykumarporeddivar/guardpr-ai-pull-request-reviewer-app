import type { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://guardpr.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: BASE,                         lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/dashboard`,           lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/dashboard/settings`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/dashboard/custom-rules`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/dashboard/review-history`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ]
}