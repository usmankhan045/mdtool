import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StructuredData from '@/components/seo/StructuredData';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mdtool.dev'),
  title: { default: 'MDTool — Free Developer Tools', template: '%s | MDTool' },
  description: 'Free online developer tools. Convert Markdown to PDF, Markdown to HTML, and more. Fast, client-side, no login required.',
  keywords: ['markdown to pdf', 'developer tools', 'md to pdf', 'markdown converter'],
  authors: [{ name: 'MDTool' }],
  creator: 'MDTool',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.mdtool.dev',
    siteName: 'MDTool',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MDTool — Free Developer Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        {adsenseId && <link rel="preconnect" href="https://pagead2.googlesyndication.com" />}
        {gaId && <link rel="preconnect" href="https://www.googletagmanager.com" />}
        {adsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <StructuredData type="organization" />
        <Header />
        {children}
        <Footer />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
