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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chọn chế độ học</DialogTitle>
          <DialogDescription>Bạn muốn học bộ từ này với chế độ nào?</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 py-4">
          {modes.map((mode) => (
            <Button
              key={mode.name}
              variant="outline"
              className="flex flex-col gap-2 h-auto py-4 hover:bg-primary/10 transition-all active:scale-95"
              onClick={() => handleSelect(mode.name)}
            >
              <span className="text-3xl">{mode.icon}</span>
              <span className="text-sm font-medium">{mode.label}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}