import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
export function StatCard({ icon, title, value, description }: { icon: React.ReactNode; title: string; value: string; description: string }) {
  return (
    <Card className="border-border/50 bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <CardHeader><div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center text-primary">{icon}</div><CardTitle className="text-sm font-medium text-muted-foreground pt-2">{title}</CardTitle></CardHeader>
      <CardContent><div className="text-3xl font-bold text-foreground">{value}</div><p className="text-sm text-muted-foreground mt-1">{description}</p></CardContent>
    </Card>
  )
}