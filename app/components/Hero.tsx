export default function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      // min-h-svh rather than h-screen: `svh` is the viewport with mobile browser
      // chrome showing, so the section can't overflow when the URL bar retracts,
      // and `min-` lets it grow if content ever exceeds one screen.
      className="mx-auto grid min-h-svh w-full max-w-5xl items-center gap-10 px-6 py-24 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
    >
      {/* Decorative only — the drifting pattern carries no information, and all
          of its motion is defined inside a prefers-reduced-motion query. */}
      <div aria-hidden="true" className="hero-pattern h-44 md:h-80">
        <div className="hero-layer hero-layer--grid" />
        <div className="hero-layer hero-layer--dots" />
      </div>

      <div>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted">Portfolio</p>
        {/* TODO: replace with real content */}
        <h1 className="mt-3 text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
          Your Name
        </h1>
        <p className="mt-5 max-w-prose text-lg text-muted">
          One line on what you build and who you build it for. Replace this with your
          own positioning statement.
        </p>
      </div>
    </section>
  );
}