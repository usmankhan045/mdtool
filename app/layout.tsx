import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://devmark.tools'),
  title: { default: 'DevMark — Free Developer Tools', template: '%s | DevMark' },
  description: 'Free online developer tools. Convert Markdown to PDF, Markdown to HTML, and more. Fast, client-side, no login required.',
  keywords: ['markdown to pdf', 'developer tools', 'md to pdf', 'markdown converter'],
  authors: [{ name: 'DevMark' }],
  creator: 'DevMark',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmark.tools',
    siteName: 'DevMark',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'DevMark — Free Developer Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense — replace ca-pub-XXXXXXXXXXXXXXXX with your publisher ID after approval */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
      </body>
    </html>
  );
}
