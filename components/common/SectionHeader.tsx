export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return <div className="text-center mb-10"><h2 className="text-3xl font-bold">{title}</h2>{subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}</div>
}