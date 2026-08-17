import experience from '@/content/experience';
import { formatRange } from '@/lib/format';

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className="mx-auto w-full max-w-5xl px-6 py-16"
    >
      <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted">Experience</h2>

      {/* Ordered: the sequence of roles is meaningful. */}
      <ol className="mt-6 space-y-4">
        {experience.map((role) => (
          <li
            key={`${role.company}-${role.start}`}
            className="rounded-lg border border-foreground/15 bg-foreground/[0.04] p-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-semibold text-foreground">{role.role}</h3>
              <p className="font-mono text-xs text-muted">
                <time dateTime={role.start}>{formatRange(role.start, role.end)}</time>
              </p>
            </div>

            <p className="mt-1 text-sm text-muted">
              {role.company} · {role.location}
            </p>

            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-foreground marker:text-muted">
              {role.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>

            {role.tech.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
                {role.tech.map((item) => (
                  <li
                    key={item}
                    className="rounded border border-foreground/15 px-2 py-0.5 font-mono text-xs text-muted"
                  >
                    {item}
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