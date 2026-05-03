import { MainLayout } from '@/components/layout/main-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Flame, Trophy, Zap, ArrowRight, Sparkles, Users, Target } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              Đã có 10,000+ học viên
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                NÓI HỌC TỪ VỰNG TIẾNG ANH
              </span>
              <br />
              <span className="text-foreground">VUI VẺ VÀ HIỆU QUẢ</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Dành cho người mất gốc, 10K từ vựng tại LEARN24HVOCAB giúp bạn tiến bộ rõ rệt
              trong thời gian ngắn, giữ vững động lực và nâng cao khả năng đọc hiểu tiếng Anh.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="group bg-primary hover:bg-primary/90 shadow-md">
                🚀 Khởi động LearnVocal
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                📚 Bắt đầu với 3000 từ đầu tiên
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard
            icon={<BookOpen className="h-6 w-6" />}
            title="Kho từ vựng"
            value="10,000+"
            description="Bài học nền tảng từ mất gốc đến nâng cao"
          />
          <StatCard
            icon={<Zap className="h-6 w-6" />}
            title="Chế độ học"
            value="Flashcard + Quiz"
            description="4 chế độ học đa dạng, game hóa"
          />
          <StatCard
            icon={<Trophy className="h-6 w-6" />}
            title="Hiệu quả"
            value="Tăng 300+ điểm"
            description="Sau 3 tháng luyện tập đều đặn"
          />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Khám phá ngay</h2>
          <p className="text-muted-foreground mt-2">Lộ trình học được cá nhân hóa cho bạn</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            href="/vocab"
            title="📖 Từ vựng"
            description="2,000+ từ theo chủ đề TOEIC"
          />
          <FeatureCard
            href="/tests"
            title="🎯 Luyện đề"
            description="30+ đề thi thử chuẩn ETS"
          />
          <FeatureCard
            href="/practice"
            title="⚡ Luyện tập"
            description="Ngữ pháp, nghe, đọc có lộ trình"
          />
          <FeatureCard
            href="/arena"
            title="⚔️ Đấu trường"
            description="Thi đấu PvP cùng bạn bè"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 p-8 md:p-12 text-center border border-primary/20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold">Sẵn sàng chinh phục TOEIC?</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Tham gia cùng hàng ngàn học viên mỗi ngày
            </p>
            <Button size="lg" className="mt-6 bg-primary hover:bg-primary/90 shadow-md">
              Đăng ký miễn phí <Users className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

function StatCard({ icon, title, value, description }: any) {
  return (
    <Card className="border-border/50 bg-white shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
      <CardHeader>
        <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center text-primary">
          {icon}
        </div>
        <CardTitle className="text-sm font-medium text-muted-foreground pt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

function FeatureCard({ href, title, description }: { href: string; title: string; description: string }) {
  const [emoji, ...restTitle] = title.split(' ')
  const titleText = restTitle.join(' ')
  return (
    <Link href={href}>
      <Card className="h-full border-border/50 bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
        <CardContent className="pt-6">
          <div className="text-3xl mb-2">{emoji}</div>
          <h3 className="font-semibold text-lg mt-2">{titleText}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}