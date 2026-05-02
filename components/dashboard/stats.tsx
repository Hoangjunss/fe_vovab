'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Flame, BookOpen, Trophy, TrendingUp } from 'lucide-react'

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
      <StatCard
        title="Current Streak"
        value="5 days"
        icon={<Flame className="h-5 w-5" />}
        trend="+2 from last week"
        color="text-orange-500"
      />
      <StatCard
        title="Words Learned"
        value="342"
        icon={<BookOpen className="h-5 w-5" />}
        trend="+45 this week"
        color="text-blue-500"
      />
      <StatCard
        title="Highest Score"
        value="890"
        icon={<Trophy className="h-5 w-5" />}
        trend="TOEIC Score"
        color="text-yellow-500"
      />
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  trend,
  color,
}: {
  title: string
  value: string
  icon: React.ReactNode
  trend: string
  color: string
}) {
  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-foreground/80">{title}</CardTitle>
        <div className={`${color}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-foreground/60 mt-1">{trend}</p>
      </CardContent>
    </Card>
  )
}

export function DailyChallenge() {
  return (
    <Card className="border-border bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Daily Challenge
        </CardTitle>
        <CardDescription>Complete 5 vocabulary exercises to earn 50 XP</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-primary font-semibold">2/5</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '40%' }}></div>
          </div>
          <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Start Challenge
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

export function ActivityFeed() {
  const activities = [
    { id: 1, action: 'Completed Vocabulary Set', details: 'Business English', time: '2 hours ago', xp: 50 },
    { id: 2, action: 'Started Flashcard Study', details: '25 cards', time: '4 hours ago', xp: 0 },
    { id: 3, action: 'Played Word Blast', details: 'Score: 2,450', time: '1 day ago', xp: 100 },
    { id: 4, action: 'Mock Test Session', details: 'Listening Part 1', time: '2 days ago', xp: 80 },
  ]

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start justify-between pb-4 border-b border-border last:pb-0 last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{activity.action}</p>
                <p className="text-xs text-foreground/60 mt-1">{activity.details}</p>
                <p className="text-xs text-foreground/40 mt-1">{activity.time}</p>
              </div>
              {activity.xp > 0 && (
                <span className="text-sm font-semibold text-primary">+{activity.xp} XP</span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
