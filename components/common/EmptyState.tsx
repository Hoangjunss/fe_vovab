import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'
export function EmptyState({ icon: Icon, message, buttonText, onButtonClick }: { icon: LucideIcon; message: string; buttonText?: string; onButtonClick?: () => void }) {
  return (
    <div className="text-center py-12">
      <Icon className="mx-auto h-12 w-12 text-muted-foreground/20 mb-4" />
      <p className="text-muted-foreground">{message}</p>
      {buttonText && <Button onClick={onButtonClick} className="mt-4 bg-primary text-white shadow-md">{buttonText}</Button>}
    </div>
  )
}