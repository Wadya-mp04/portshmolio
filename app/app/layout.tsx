import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import ThemeProvider from '@/components/ThemeProvider';
import BackgroundCanvas from '@/components/BackgroundCanvas';
import ClickSound from '@/components/ClickSound';
import './globals.css';

// TODO: replace with real content
const SITE = {
  name: 'Waddah Daker',
  title: 'Waddah Daker — Portfolio',
  description:
    'Placeholder description. Software engineer portfolio: experience, projects, skills, and a daily Sudoku.',
  url: 'https://example.com',
};

/**
 * Fetched and self-hosted at build time, so the export ships the font itself —
 * no request to Google at runtime, and no third-party dependency in the page.
 *
 * Exposed as a CSS variable rather than a className so globals.css can put it
 * behind Tailwind's `--font-sans`; that way every existing `font-sans` utility
 * and the default body font pick it up without touching any component.
 *
 * No `weight` because Space Grotesk is variable (300–700) — listing weights
 * would download several static cuts instead of one file covering the range.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  // Needed so relative Open Graph URLs resolve; point this at the real domain.
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  openGraph: {
    type: 'website',
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: next-themes sets the `dark` class on <html>
    // before React hydrates, which is a deliberate server/client mismatch.
    // The font variable goes on <html> so it is in scope for everything,
    // including the ASCII logo's generated subtree.
    <html lang="en" className={spaceGrotesk.variable} suppressHydrationWarning>
      {/* No bg-* here on purpose: the page background lives on <html> so the
          -z-10 BackgroundCanvas can paint above it. A background on body would
          paint later and hide the canvas. */}
      <body className="text-foreground antialiased">
        <ThemeProvider>
          <BackgroundCanvas />
          {/* Renders nothing — mounted once here so a single delegated listener
              covers every [data-click-sound] control on the page. */}
          <ClickSound />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}