'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { MainLayout } from '@/components/layout/main-layout';
import { HeroSection } from '@/components/dashboard/HeroSection';
import { StatCard } from '@/components/common/StatCard';
import { FeatureCard } from '@/components/common/FeatureCard';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Button } from '@/components/ui/button';
import { Users, Headphones, FileText, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Component bọc animation khi scroll
function ScrollSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } }
      }}
    >
      {children}
    </motion.div>
  );
}

// Component cho từng thẻ StatCard có animation riêng lẻ (stagger)
function AnimatedStatCard({ icon, title, value, description, index }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: index * 0.1 } }
      }}
    >
      <StatCard icon={icon} title={title} value={value} description={description} />
    </motion.div>
  );
}

// Component cho FeatureCard tương tự
function AnimatedFeatureCard({ href, icon, title, description, index }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: index * 0.1 } }
      }}
    >
      <FeatureCard href={href} icon={icon} title={title} description={description} />
    </motion.div>
  );
}

// Step item
function AnimatedStep({ number, title, description, index }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: index * 0.15 } }
      }}
      className="text-center"
    >
      <div className="text-5xl font-black text-primary mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-white/60 shadow-md">{number}</div>
      <h3 className="text-xl font-bold mt-4">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <MainLayout>
      {/* Structured Data giữ nguyên */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Vocab War",
            "url": "https://vocabwar.online",
            "description": "Học từ vựng TOEIC trực tuyến miễn phí với flashcard, trắc nghiệm và game hóa",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://vocabwar.online/vocab?search={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      
      {/* Hero section không cần animation riêng vì đã có sẵn, nhưng vẫn có thể bọc ScrollSection nếu muốn */}
      <HeroSection />

      {/* Stats section */}
      <ScrollSection>
        <section className="container mx-auto px-4 py-12">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatedStatCard icon={<Users className="h-6 w-6" />} title="Học viên" value="18,418+" description="đang học mỗi ngày" index={0} />
            <AnimatedStatCard icon={<Headphones className="h-6 w-6" />} title="Bài luyện nghe" value="7,773+" description="câu hỏi đa dạng" index={1} />
            <AnimatedStatCard icon={<FileText className="h-6 w-6" />} title="Ngữ pháp" value="1,002+" description="câu hỏi thực hành" index={2} />
            <AnimatedStatCard icon={<Target className="h-6 w-6" />} title="Đề thi thử" value="75+" description="bám sát cấu trúc ETS" index={3} />
          </div>
        </section>
      </ScrollSection>

      {/* Features section */}
      <ScrollSection delay={0.2}>
        <section className="container mx-auto px-4 py-12">
          <SectionHeader title="Bạn sẽ học được gì?" subtitle="Hệ thống toàn diện từ nền tảng đến nâng cao" />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            <AnimatedFeatureCard href="/vocab" icon={FileText} title="Từ vựng" description="Học với flashcard, SRS, game hoá – ghi nhớ lâu hơn" index={0} />
            <AnimatedFeatureCard href="/tests" icon={Target} title="Luyện đề" description="Đề thi thử chuẩn ETS, chấm điểm, giải thích chi tiết" index={1} />
            <AnimatedFeatureCard href="/practice" icon={Headphones} title="Luyện tập" description="Ngữ pháp, nghe, đọc theo cấp độ từ dễ đến khó" index={2} />
            <AnimatedFeatureCard href="/arena" icon={Users} title="Đấu trường" description="Thi đấu PvP cùng bạn bè, cạnh tranh thứ hạng" index={3} />
          </div>
        </section>
      </ScrollSection>

      {/* How it works section */}
      <ScrollSection delay={0.1}>
        <section className="container mx-auto px-4 py-12 bg-white/40 backdrop-blur-sm rounded-3xl my-8">
          <SectionHeader title="Cách hoạt động" subtitle="Ba bước đơn giản để chinh phục TOEIC" />
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3 mt-8">
            <AnimatedStep number="1" title="Chọn kỹ năng" description="Từ vựng, ngữ pháp, luyện nghe hoặc đề thi thử – bạn chủ động lộ trình" index={0} />
            <AnimatedStep number="2" title="Làm bài & nhận phản hồi" description="Mỗi câu đều có giải thích chi tiết, từ vựng kèm theo" index={1} />
            <AnimatedStep number="3" title="Lưu tiến độ & cạnh tranh" description="Đăng nhập để lưu streak, XP, và tham gia bảng xếp hạng" index={2} />
          </div>
        </section>
      </ScrollSection>

      {/* CTA section */}
      <ScrollSection delay={0.2}>
        <section className="container mx-auto px-4 py-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 p-8 md:p-12 text-center border border-primary/20 shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold">Sẵn sàng nâng cao điểm TOEIC?</h2>
              <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                Tham gia cùng 18.418+ học viên mỗi ngày – miễn phí, không thẻ tín dụng
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Button size="lg" className="clay-button">🚀 Bắt đầu ngay</Button>
                <Button size="lg" variant="outline" className="clay-button-outline">📖 Khám phá khoá học</Button>
              </div>
            </div>
          </div>
        </section>
      </ScrollSection>
    </MainLayout>
  );
}