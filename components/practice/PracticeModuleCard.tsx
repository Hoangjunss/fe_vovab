import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'
export function PracticeModuleCard({ module }: { module: { id: number; title: string; description: string; icon: LucideIcon; lessons: number; difficulty: string; color: string } }) {
  const Icon = module.icon
  const [bgColor, textColor] = module.color.split(' ')
  return (
    <Card className="border-border/50 bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden group">
      <div className={`${bgColor} h-24 flex items-center justify-center`}><Icon className="h-12 w-12 text-foreground/60" /></div>
      <CardHeader><CardTitle className="text-lg">{module.title}</CardTitle></CardHeader>
      <CardContent className="space-y-4"><p className="text-sm text-muted-foreground">{module.description}</p><div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">{module.lessons} bài học</span><span className={`px-2 py-1 rounded-full text-xs font-semibold ${textColor}`}>{module.difficulty}</span></div><Button className="w-full bg-primary text-white shadow-md hover:shadow-lg group-hover:scale-105 transition">Bắt đầu học</Button></CardContent>
    </Card>
  )
}