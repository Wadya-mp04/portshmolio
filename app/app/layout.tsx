import type { Metadata } from 'next';
import ThemeProvider from '@/components/ThemeProvider';
import BackgroundCanvas from '@/components/BackgroundCanvas';
import './globals.css';

// TODO: replace with real content
const SITE = {
  name: 'Your Name',
  title: 'Your Name — Portfolio',
  description:
    'Placeholder description. Software engineer portfolio: experience, projects, skills, and a daily Sudoku.',
  url: 'https://example.com',
};

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
    <html lang="en" suppressHydrationWarning>
      {/* No bg-* here on purpose: the page background lives on <html> so the
          -z-10 BackgroundCanvas can paint above it. A background on body would
          paint later and hide the canvas. */}
      <body className="text-foreground antialiased">
        <ThemeProvider>
          <BackgroundCanvas />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}