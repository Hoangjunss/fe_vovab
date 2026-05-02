import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Swords, Users, Trophy, Clock } from 'lucide-react'
export function ArenaPageContent() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="border-border/50 bg-white shadow-md hover:shadow-lg transition-all"><CardHeader><CardTitle className="flex items-center gap-2 text-primary"><Users className="h-5 w-5" />Tìm trận ngẫu nhiên</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Ghép cặp cùng trình độ</p><Button className="w-full mt-4 bg-primary text-white shadow-md">Tìm trận</Button></CardContent></Card>
      <Card className="border-border/50 bg-white shadow-md hover:shadow-lg transition-all"><CardHeader><CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5 text-accent" />Bảng xếp hạng</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Top 10 người chơi tuần này</p><Button variant="outline" className="w-full mt-4">Xem chi tiết</Button></CardContent></Card>
      <Card className="border-border/50 bg-white shadow-md hover:shadow-lg transition-all"><CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-muted-foreground" />Lịch sử thi đấu</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Xem lại các trận đã tham gia</p><Button variant="outline" className="w-full mt-4">Xem lịch sử</Button></CardContent></Card>
    </div>
  )
}