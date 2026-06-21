import type { ReactNode } from 'react'
import { AppHeader, AppSidebar, DemoBanner } from '@/components/layout'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <DemoBanner />
      <div className="flex">
        <AppSidebar />
        <main className="min-w-0 flex-1">
          <AppHeader />
          {children}
        </main>
      </div>
    </div>
  )
}
