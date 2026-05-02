import { Card, CardContent } from '@/components/ui/card'
export function TestStats({ stats }: { stats: { label: string; value: string }[] }) {
  return <div className="grid gap-6 md:grid-cols-4">{stats.map((s, i) => <Card key={i} className="border-border/50 bg-white shadow-md text-center"><CardContent className="pt-6"><p className="text-sm text-muted-foreground mb-1">{s.label}</p><p className="text-3xl font-bold text-foreground">{s.value}</p></CardContent></Card>)}</div>
}