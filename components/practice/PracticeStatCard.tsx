import { Card, CardContent } from '@/components/ui/card'
export function PracticeStatCard({ label, value }: { label: string; value: string }) {
  return <Card className="border-border/50 bg-white shadow-md text-center"><CardContent className="pt-6"><p className="text-sm text-muted-foreground mb-1">{label}</p><p className="text-3xl font-bold text-foreground">{value}</p></CardContent></Card>
}