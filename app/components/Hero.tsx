export default function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      // min-h-svh rather than h-screen: `svh` is the viewport with mobile browser
      // chrome showing, so the section can't overflow when the URL bar retracts,
      // and `min-` lets it grow if content ever exceeds one screen.
      // Full-bleed rather than the max-w-5xl the other sections use, so the text
      // sits near the viewport edge instead of at a centred container boundary.
      // Single column now: the artwork moved to a site-wide background layer.
      className="flex min-h-svh w-full flex-col justify-center px-6 py-24 sm:px-10 lg:px-16"
    >
      <div>
        {/* TODO: replace with real content */}
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
          Backend Developer
        </p>

        {/* text-balance so a two-line name splits evenly rather than leaving one
            word stranded — real names are longer than the placeholder. */}
        <h1 className="mt-3 text-balance text-6xl font-semibold tracking-tight text-foreground sm:text-7xl">
          Waddah Daker
        </h1>

        <p className="mt-6 max-w-prose text-lg text-muted">
          One line on what you build and who you build it for. Replace this with your
          own positioning statement.
        </p>

        <p className="mt-5 flex items-center gap-2 font-mono text-sm text-muted">
          <PinIcon />
          Montreal, CA
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="mailto:you@example.com"
            className="rounded-md bg-foreground px-5 py-2.5 font-mono text-sm text-background transition duration-200 hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:active:scale-95"
          >
            Get in touch
          </a>

          {/* TODO: drop the file at app/public/resume.pdf — that directory does
              not exist yet, so this 404s until you add it. */}
          <a
            href="/resume.pdf"
            className="rounded-md border border-foreground/30 px-5 py-2.5 font-mono text-sm text-foreground transition duration-200 hover:border-foreground/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:active:scale-95"
          >
            Resume
          </a>
        </div>
      </div>

      {/* Decorative only — the drifting pattern carries no information, and all
          of its motion is defined inside a prefers-reduced-motion query. */}
    </section>
  );
}

function PinIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
    >
      <path d="M20 10c0 5.2-6.4 11-8 11s-8-5.8-8-11a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.75" />
    </svg>
  );
}