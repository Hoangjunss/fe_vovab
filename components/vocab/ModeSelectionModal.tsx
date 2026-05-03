'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ModeSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setId: string;
}

export function ModeSelectionModal({ open, onOpenChange, setId }: ModeSelectionModalProps) {
  const router = useRouter();

  const modes = [
    { name: 'flip', label: 'Lật thẻ', icon: '🔄' },
    { name: 'mcq', label: 'Trắc nghiệm', icon: '📖' },
    { name: 'typing', label: 'Gõ chính tả', icon: '⌨️' },
    { name: 'listening', label: 'Nghe - chọn', icon: '🔊' },
  ];

  const handleSelect = (mode: string) => {
    onOpenChange(false);
    router.push(`/vocab/study/${setId}?mode=${mode}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-2xl border border-white/20 bg-white/60 backdrop-blur-xl shadow-xl">
        <div className="p-6">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-semibold text-foreground">Chọn chế độ học</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground mt-1">
              Bạn muốn học bộ từ này với chế độ nào?
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-5">
            {modes.map((mode) => (
              <Button
                key={mode.name}
                variant="ghost"
                className="flex flex-col gap-1.5 h-auto py-4 rounded-xl bg-white/40 backdrop-blur-sm transition-all duration-200 active:scale-95 border border-white/30 shadow-sm hover:bg-white/70 hover:shadow-md hover:border-primary/30 hover:scale-[1.02]"
                onClick={() => handleSelect(mode.name)}
              >
                <span className="text-3xl transition-transform duration-200 group-hover:scale-110">{mode.icon}</span>
                <span className="text-xs font-medium text-foreground/80 group-hover:text-primary transition-colors">
                  {mode.label}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}