import { MainLayout } from '@/components/layout/main-layout'
import { HeroSection } from '@/components/dashboard/HeroSection'
import { StatCard } from '@/components/common/StatCard'
import { FeatureCard } from '@/components/common/FeatureCard'
import { SectionHeader } from '@/components/common/SectionHeader'
import { Button } from '@/components/ui/button'
import { BookOpen, Zap, Trophy, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <section className="container mx-auto px-4 py-12"><div className="grid gap-6 md:grid-cols-3"><StatCard icon={<BookOpen className="h-6 w-6" />} title="Kho từ vựng" value="10,000+" description="Bài học nền tảng" /><StatCard icon={<Zap className="h-6 w-6" />} title="Chế độ học" value="Flashcard + Quiz" description="Đa dạng, game hóa" /><StatCard icon={<Trophy className="h-6 w-6" />} title="Hiệu quả" value="Tăng 300+ điểm" description="Sau 3 tháng" /></div></section>
      <section className="container mx-auto px-4 py-12"><SectionHeader title="Khám phá ngay" subtitle="Lộ trình học được cá nhân hóa" /><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"><FeatureCard href="/vocab" emoji="📖" title="Từ vựng" description="2,000+ từ theo chủ đề TOEIC" /><FeatureCard href="/tests" emoji="🎯" title="Luyện đề" description="30+ đề thi thử chuẩn ETS" /><FeatureCard href="/practice" emoji="⚡" title="Luyện tập" description="Ngữ pháp, nghe, đọc" /><FeatureCard href="/arena" emoji="⚔️" title="Đấu trường" description="Thi đấu PvP cùng bạn bè" /></div></section>
      <section className="container mx-auto px-4 py-16"><div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 p-8 md:p-12 text-center border border-primary/20"><div className="relative z-10"><h3 className="text-2xl md:text-3xl font-bold">Sẵn sàng chinh phục TOEIC?</h3><p className="text-muted-foreground mt-2 max-w-md mx-auto">Tham gia cùng hàng ngàn học viên</p><Button size="lg" className="mt-6 bg-primary hover:bg-primary/90 shadow-md">Đăng ký miễn phí <Users className="ml-2 h-4 w-4" /></Button></div></div></section>
    </MainLayout>
  )
}