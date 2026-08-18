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
      <div className="mx-auto w-full max-w-5xl px-6">
        {/* 19rem, not 14rem: "./EXPERIENCE" is 12 characters, and at text-3xl
            with 0.2em tracking a mono glyph advances ~24px — ~288px of label.
            gap-20 pushes the timeline further from it. */}
        <div className="lg:grid lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-20">
        {/* Pinned alongside the roles. `self-start` is load-bearing: grid items
            stretch to the row height by default, and an element as tall as its
            container has no slack to stick within.
            The motion-safe:lg: pair scopes the larger type and deeper offset to
            the scroll-jacked view only — it matches the media query in
            globals.css that turns the timeline into the pinned stage. */}
        {/* z-10 keeps the heading above the logo, which is absolutely positioned
            out of the scroller and over this column. Both are position: sticky,
            so without it DOM order would paint the logo on top. */}
          <div className="relative z-10 lg:sticky lg:top-24 lg:self-start motion-safe:lg:top-36">
            <h2 className="section-heading">./Experience</h2>
          </div>

          <ExperienceScroller roles={experience} />
        </div>
      </div>
    </section>
  );
}