import skills from '@/content/skills';

export default function SkillsSection() {
  return (
    <section
      id="skills"
      aria-label="Skills"
      className="mx-auto w-full max-w-5xl px-6 py-16"
    >
      <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted">Skills</h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <div
            key={group.category}
            className="rounded-lg border border-foreground/15 bg-foreground/[0.04] p-5"
          >
            <h3 className="text-base font-semibold text-foreground">{group.category}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded border border-foreground/15 px-2 py-0.5 font-mono text-xs text-muted"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}