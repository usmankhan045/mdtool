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

// Search-engine ownership verification codes. Each is optional - set the env
// var to the code the webmaster console gives you and the matching <meta> tag
// renders automatically; leave it unset and no tag is emitted.
//   NEXT_PUBLIC_BING_VERIFICATION   → Bing Webmaster Tools  (msvalidate.01)
//   NEXT_PUBLIC_YANDEX_VERIFICATION → Yandex Webmaster       (yandex-verification)
//   NEXT_PUBLIC_GOOGLE_VERIFICATION → Google Search Console  (only needed if not verified via DNS)
const bingVerification = process.env.NEXT_PUBLIC_BING_VERIFICATION;
const yandexVerification = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION;
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL('https://www.mdtool.dev'),
  title: { default: 'MDTool - Free Online Markdown Converter: MD to PDF, HTML & Word', template: '%s | MDTool' },
  description: 'MDTool is a free online Markdown converter. Turn Markdown into PDF, HTML, and Word (and back) right in your browser. No login, no uploads, no watermarks.',
  authors: [{ name: 'MDTool' }],
  creator: 'MDTool',
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(yandexVerification ? { yandex: yandexVerification } : {}),
    ...(bingVerification ? { other: { 'msvalidate.01': bingVerification } } : {}),
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.mdtool.dev',
    siteName: 'MDTool',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MDTool - Free Online Markdown Converter' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  // GA4 measurement ID for mdtool.dev (public by design; env var can override it).
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-N5NLCET100';

  return (
    <html lang="en">
      <head>
        {adsenseId && <link rel="preconnect" href="https://pagead2.googlesyndication.com" />}
        {gaId && <link rel="preconnect" href="https://www.googletagmanager.com" />}
        {/* AdSense waits until the browser is idle after load, so it never competes with LCP/INP. */}
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
        {/* @next/third-parties loads gtag.js with next/script's default afterInteractive strategy. */}
        {gaId && <GoogleAnalytics gaId={gaId} />}
        {/* Localized pages (/es, /zh, non-English posts) mark their content with
            lang="…" on <main>/<article>; mirror it onto <html> for crawlers and
            screen readers. Pages stay static; Vercel also sends Content-Language. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var e=document.querySelector('main[lang],article[lang]');if(e&&e.lang)document.documentElement.lang=e.lang;})();",
          }}
        />
      </body>
    </html>
  );
}
