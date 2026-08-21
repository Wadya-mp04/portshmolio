import Terminal from '@/components/Terminal';

/**
 * Currently unmounted — the terminal moved into the hero's right column, which
 * carries the #about anchor instead. Kept whole so restoring a standalone
 * section is one line in page.tsx.
 */
export default function About() {
  return (
    <section id="about" aria-label="About" className="mx-auto w-full max-w-5xl px-6 py-24">
      {/* The window chrome reads as a title, but "manifesto.sh — 80x24" is a bad
          heading to land on when navigating by headings. */}
      <h2 className="sr-only">./About</h2>

      {/* Width lives here rather than in Terminal, which fills its container. */}
      <div className="mx-auto w-full max-w-3xl">
        <Terminal />
      </div>
    </section>
  );
}