import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
export function FeatureCard({ href, emoji, title, description }: { href: string; emoji: string; title: string; description: string }) {
  return (
    <Link href={href}>
      <Card className="h-full border-border/50 bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
        <CardContent className="pt-6"><div className="text-3xl mb-2">{emoji}</div><h3 className="font-semibold text-lg mt-2">{title}</h3><p className="text-sm text-muted-foreground mt-1">{description}</p></CardContent>
      </Card>
    </Link>
  )
}