import ResumeButton from '@/components/ResumeButton';
import Terminal from '@/components/Terminal';

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
      className="flex min-h-svh w-full flex-col justify-center px-6 py-24 sm:px-10 lg:px-16"
    >
      {/* Two columns from lg, stacked below it.

          The NAME column is the one with a fixed width; the terminal takes 1fr
          and absorbs everything left over, so it runs to the right padding edge
          at any viewport. Constraining it the other way round is what left a
          band of dead space beside the card.

          The name cap steps 26rem → 34rem at xl because the slack has to come
          from somewhere: at 1024px the grid only has 896px to divide, and a
          34rem name column would leave the terminal ~320px — under the ~402px
          its ASCII banner needs before that starts scrolling horizontally.

          The second track takes 1fr and the 44rem cap lives on the card inside
          it, not on the track. Capping the track instead would leave the whole
          column short and pool the slack down its right-hand side; capping the
          card lets it centre in the space it has. 44rem because the content is
          short mono lines — past roughly that width it stops reading as a
          terminal and starts reading as a mostly-empty panel. */}
      <div className="grid w-full items-center gap-12 lg:grid-cols-[26rem_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[34rem_minmax(0,1fr)]">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
            Backend Developer
          </p>

          {/* text-balance so a two-line name splits evenly rather than leaving one
              word stranded — real names are longer than the placeholder. */}
          <h1 className="mt-3 text-balance text-6xl font-semibold tracking-tight text-foreground sm:text-7xl">
            Waddah Daker
          </h1>

          {/* Deliberately does not restate the eyebrow above it, the location
              pin below it, or the degree and certification the terminal covers
              — all four are on screen at once now, so this earns its space by
              saying what the work IS rather than who is doing it. */}
          <p className="mt-6 max-w-prose text-lg text-muted">
            Building reliable systems from an information retrieval pipeline benchmarked across 21,578 documents to a production AWS deployment serving real traffic.
          </p>

          <p className="mt-5 flex items-center gap-2 font-mono text-sm text-muted">
            <PinIcon />
            Montreal, CA
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#contact"
              data-click-sound
              className="rounded-md bg-foreground px-5 py-2.5 font-mono text-sm text-background transition duration-200 hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:active:scale-95"
            >
              Get in touch
            </a>

            {/* TODO: drop the file at app/public/resume.pdf. It is missing, and
                because the link downloads rather than navigates, clicking it
                currently saves Next's 404 page under that filename — a quiet
                failure rather than a visible one. */}
            <ResumeButton />
          </div>
        </div>

        {/* A <section> rather than a <div>: with aria-label it becomes a named
            region, which is what makes #about a real destination rather than a
            bare scroll target. Carries the anchor the nav points at, now that
            the standalone About section is unmounted. */}
        {/* mx-auto centres the card in whatever width the 1fr track has. */}
        <section id="about" aria-label="About" className="mx-auto w-full max-w-[44rem]">
          <h2 className="sr-only">./About</h2>
          <Terminal />
        </section>
      </div>
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