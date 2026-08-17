'use client';

import dynamic from 'next/dynamic';

/**
 * The lazy-load boundary.
 *
 * next/dynamic with `ssr: false` is not allowed inside a Server Component in
 * Next 16, and page.tsx is one — so this thin client wrapper exists purely to
 * make the deferred import legal. The widget itself is never server-rendered,
 * which is what lets it read localStorage during its first render.
 */
const SudokuWidget = dynamic(() => import('./SudokuWidget'), {
  ssr: false,
  // Sized to the loaded widget so deferring it costs no layout shift:
  // 9 cells (36px, or 44px from sm) + the timer row + the banner.
  loading: () => (
    <div
      className="h-[27rem] w-full max-w-[25rem] rounded-lg border border-foreground/15 bg-foreground/[0.04] sm:h-[32rem] motion-safe:animate-pulse"
      aria-hidden="true"
    />
  ),
});

export default function SudokuSection() {
  return (
    <section
      id="sudoku"
      aria-label="Daily Sudoku"
      className="mx-auto w-full max-w-5xl px-6 py-16"
    >
      <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted">Daily Sudoku</h2>
      <p className="mt-3 max-w-prose text-muted">
        A fresh puzzle each day. Your time is recorded against an anonymous id stored in
        your browser — no account, no personal data.
      </p>

      <div className="mt-8">
        <SudokuWidget />
      </div>
    </section>
  );
}