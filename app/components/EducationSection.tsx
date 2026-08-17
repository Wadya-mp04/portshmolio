import education from '@/content/education';
import { formatRange } from '@/lib/format';

export default function EducationSection() {
  return (
    <section
      id="education"
      aria-label="Education"
      className="mx-auto w-full max-w-5xl px-6 py-16"
    >
      <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted">Education</h2>

      <ol className="mt-6 space-y-4">
        {education.map((item) => (
          <li
            key={`${item.institution}-${item.start}`}
            className="rounded-lg border border-foreground/15 bg-foreground/[0.04] p-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-semibold text-foreground">
                {item.credential}, {item.field}
              </h3>
              <p className="font-mono text-xs text-muted">
                <time dateTime={item.start}>{formatRange(item.start, item.end)}</time>
              </p>
            </div>

            <p className="mt-1 text-sm text-muted">{item.institution}</p>

            {item.notes && <p className="mt-3 text-foreground">{item.notes}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}