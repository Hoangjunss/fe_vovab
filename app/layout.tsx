import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/context/AuthContext'
import { Mascot } from '@/components/common/Mascot'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://vocabwar.online'),
  title: {
    default: 'Vocab War - Học từ vựng TOEIC hiệu quả',
    template: '%s | Vocab War'
  },
  description: 'Nền tảng học từ vựng TOEIC thông minh với flashcard, trắc nghiệm, luyện nghe và game hóa. 10,000+ từ vựng, lộ trình cá nhân hóa, miễn phí.',
  keywords: ['học từ vựng', 'TOEIC', 'luyện thi TOEIC', 'flashcard', 'trắc nghiệm tiếng Anh', 'Vocab War'],
  authors: [{ name: 'Vocab War Team' }],
  creator: 'Vocab War',
  publisher: 'Vocab War',
  formatDetection: { telephone: false },
  openGraph: {
    title: 'Vocab War - Học từ vựng TOEIC thông minh',
    description: '10,000+ từ vựng, flashcard, game, luyện đề - Miễn phí',
    url: 'https://vocabwar.online',
    siteName: 'Vocab War',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Vocab War - Học từ vựng TOEIC'
      }
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vocab War - Học từ vựng TOEIC',
    description: 'Nền tảng học từ vựng TOEIC hiệu quả với flashcard và game',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: 'https://vocabwar.online' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#6B8EFF',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''

  return (
    <html lang="vi" className="bg-background">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <GoogleOAuthProvider clientId={googleClientId}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </GoogleOAuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <Mascot />
      </body>
    </html>
  )
}