import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Cairo } from 'next/font/google';
import { PreferencesProvider, themeInitScript } from '@/components/preferences-provider';
import './globals.css';

// ReOps brand typeface (same family https://reops.io uses for Arabic + English).
const cairo = Cairo({ subsets: ['arabic', 'latin'], variable: '--font-cairo' });

export const metadata: Metadata = {
  title: 'ريوبس | نعيد تعريف التشغيل',
  description: 'رقمنة إجراءات التشغيل، أتمتة التدريب، ومتابعة الأداء لحظيًا عبر جميع الفروع من منصة واحدة.',
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  // Literal hex required by browsers; kept in sync with --background (light/dark).
  // Light matches reops.io theme-color (#ffffff).
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#101828' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={cairo.variable}>
      <body suppressHydrationWarning>
        <Script id="theme-init" strategy="beforeInteractive">{themeInitScript}</Script>
        <PreferencesProvider>{children}</PreferencesProvider>
      </body>
    </html>
  );
}
