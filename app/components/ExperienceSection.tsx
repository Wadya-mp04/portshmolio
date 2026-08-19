import experience from '@/content/experience';
import ExperienceScroller from '@/components/ExperienceScroller';

/**
 * Stays a Server Component and passes the roles down as props. Importing the
 * content module from inside the client component would pull Zod into the
 * browser bundle for validation that already ran at build time.
 */
export default function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-label="Experience"
      // Full-bleed, with the max-w-5xl wrapper moved inside. The logo bleeds
      // left of the content column, and clipping on a centred 1024px box would
      // slice it mid-page; clipping here puts the boundary at the viewport edge.
      //
      // overflow-x-clip, not -hidden: `clip` creates no scroll container, so the
      // sticky heading and stage inside still resolve against the viewport.
      // `hidden` would make this their scroll container and break both.
      className="w-full overflow-x-clip py-16"
    >
      <div className="mx-auto w-full max-w-5xl px-6 lg:max-w-6xl">
        {/* 19rem, not 14rem: "./EXPERIENCE" is 12 characters, and at text-3xl
            with 0.2em tracking a mono glyph advances ~24px — ~288px of label.
            gap-20 pushes the timeline further from it. */}
        <div className="lg:grid lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-12">
          {/* Mirrors .xp-stage exactly — sticky at top-0, one viewport tall,
              contents vertically centred. Because it pins on the same terms as
              the roles it never appears to travel: it is simply stationary for
              the whole pinned section, rather than scrolling up to a top offset
              and catching there, which is what read as "following".
              Scoped motion-safe:lg: so it only applies where the stage pins.
              relative + z-10 keep it above the logo, which is positioned out of
              the scroller and over this column. */}
          <div className="relative z-10 lg:self-start motion-safe:lg:sticky motion-safe:lg:top-0 motion-safe:lg:flex motion-safe:lg:h-svh motion-safe:lg:items-start motion-safe:lg:pt-[17svh]">
            <h2 className="section-heading">./Experience</h2>
          </div>

          <ExperienceScroller roles={experience} />
        </div>
      </div>
    </section>
  );
}