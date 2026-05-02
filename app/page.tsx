import { MainLayout } from '@/components/layout/main-layout'
import { DashboardStats, DailyChallenge, ActivityFeed } from '@/components/dashboard/stats'

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back!</h1>
          <p className="text-foreground/60">Keep learning and improving your TOEIC score</p>
        </div>

        <div className="space-y-6">
          <DashboardStats />
          <div className="grid gap-6 lg:grid-cols-3">
            <DailyChallenge />
            <div className="lg:col-span-2">
              <ActivityFeed />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
