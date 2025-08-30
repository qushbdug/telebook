import type { Metadata } from 'next'
import { Inter, Noto_Sans_Arabic } from 'next/font/google'
import './globals.css'
import { TelegramProvider } from '@/contexts/TelegramContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const notoSansArabic = Noto_Sans_Arabic({ 
  subsets: ['arabic'],
  variable: '--font-noto-sans-arabic',
})

export const metadata: Metadata = {
  title: 'تطبيق كروت الواي فاي - WiFi Cards App',
  description: 'تطبيق متكامل لإدارة وبيع كروت الواي فاي للشبكات المختلفة',
  keywords: ['wifi', 'cards', 'networks', 'internet', 'arabic'],
  authors: [{ name: 'WiFi Cards Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${inter.variable} ${notoSansArabic.variable} font-sans antialiased`}>
        <TelegramProvider>
          <div className="min-h-screen bg-background">
            {children}
          </div>
        </TelegramProvider>
      </body>
    </html>
  )
}