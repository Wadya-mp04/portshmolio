import education from '@/content/education';
import { formatRange } from '@/lib/format';

/**
 * A plain vertical timeline — no pinning, no swapping, no JS. Marker activation
 * is CSS hover only, so this stays a Server Component.
 */
export default function EducationSection() {
  return (
    <section
      id="education"
      aria-label="Education"
      className="mx-auto w-full max-w-5xl px-6 py-16"
    >
      <h2 className="section-heading">./Education</h2>

      <ol className="mt-10">
        {education.map((item) => (
          <li key={`${item.institution}-${item.start}`} className="tl-item">
            <span aria-hidden="true" className="tl-marker" />

            {/* Institution left, dates over location right — matching the
                Experience timeline's meta block. */}
            <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-1">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                {item.institution}
              </p>
              <p className="shrink-0 text-right font-mono text-xs leading-relaxed text-muted">
                <time dateTime={item.start}>{formatRange(item.start, item.end)}</time>
                <br />
                {item.location}
              </p>
            </div>

            <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {/* `field` is optional — degree names usually contain it already. */}
              {item.field ? `${item.credential}, ${item.field}` : item.credential}
            </h3>

            {item.notes && <p className="mt-2 font-mono text-sm text-muted">{item.notes}</p>}

            {item.coursework.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Relevant coursework">
                {item.coursework.map((course) => (
                  <li
                    key={course}
                    className="tag"
                  >
                    {course}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}