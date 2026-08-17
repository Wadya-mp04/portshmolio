'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * next-themes' provider uses context, so it has to live on the client.
 * layout.tsx is a Server Component and can't render it directly — this is the
 * boundary between the two.
 */
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    // disableTransitionOnChange is deliberately OFF: the theme cross-fade is
    // coordinated in globals.css instead, and that flag would suppress it
    // (it injects `*{transition:none!important}` for a frame on every change).
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}