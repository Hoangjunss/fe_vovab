import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

export function FeatureCard({ href, icon: Icon, title, description }: { href: string; icon: LucideIcon; title: string; description: string }) {
  return (
    <Link href={href}>
      <Card className="h-full border-border/50 bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
        <CardContent className="pt-6">
          <Icon className="h-10 w-10 text-primary mb-2" />
          <h3 className="font-semibold text-lg mt-2">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}