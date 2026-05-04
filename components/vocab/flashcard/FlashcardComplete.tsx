import { Button } from '@/components/ui/button';
import { PartyPopper } from 'lucide-react';

interface Props {
  totalElements: number;
}

export function FlashcardComplete({ totalElements }: Props) {
  return (
    <div className="text-center py-12">
      <PartyPopper className="h-12 w-12 text-green-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-green-600">Hoàn thành!</h2>
      <p className="mt-2">Bạn đã học hết {totalElements} từ trong bộ này.</p>
      <Button className="mt-6 active:scale-95 transition-transform" onClick={() => window.location.reload()}>
        Học lại
      </Button>
    </div>
  );
}