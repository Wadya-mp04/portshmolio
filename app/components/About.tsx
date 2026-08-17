// Box-drawing characters rather than slashes and pipes, so the art needs no
// escaping and survives copy/paste into the file intact.
// TODO: replace with your own ASCII art
const ASCII_ART = `
  ┌─────────────────────────────┐
  │ ▓▓▒▒░░               ░░▒▒▓▓ │
  │ ▓▒░                     ░▒▓ │
  │ ▓▒░     P L A C E       ░▒▓ │
  │ ▓▒░       H O L D E R   ░▒▓ │
  │ ▓▒░                     ░▒▓ │
  │ ▓▓▒▒░░               ░░▒▒▓▓ │
  └─────────────────────────────┘
`;

export default function About() {
  return (
    <section
      id="about"
      aria-label="About"
      className="mx-auto flex min-h-svh w-full max-w-5xl flex-col justify-center px-6 py-16"
    >
      <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted">About</h2>

      <div className="mt-6 grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
        {/* The real content lives here as ordinary prose, so assistive tech gets
            actual text rather than having to interpret the artwork. */}
        <div className="max-w-prose space-y-4 text-foreground">
          {/* TODO: replace with real content */}
          <p>
            First paragraph of your bio. What you do, what you care about, and the kind
            of problems you like working on.
          </p>
          <p>
            Second paragraph. Background, current focus, or anything that gives a
            visitor a reason to keep reading.
          </p>
        </div>

        {/* Purely decorative: hidden from the accessibility tree entirely. */}
        <pre
          aria-hidden="true"
          className="overflow-x-auto font-mono text-[0.6rem] leading-tight text-muted sm:text-xs"
        >
          {ASCII_ART}
        </pre>
      </div>
    </section>
  );
}