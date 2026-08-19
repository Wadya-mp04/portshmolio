import skills from '@/content/skills';
import SkillIcon from '@/components/SkillIcon';

export default function SkillsSection() {
  return (
    <section
      id="skills"
      aria-label="Skills"
      className="mx-auto w-full max-w-5xl px-6 py-16"
    >
      <h2 className="section-heading">./Skills</h2>

      <div className="mt-12 space-y-12">
        {skills.map((group, index) => (
          <div key={group.category}>
            {/* Label, then a rule taking whatever width is left. The rule is a
                sibling rather than a border-bottom on the heading so it aligns
                with the label's centre instead of sitting under the text. */}
            <div className="flex items-center gap-4">
              <h3 className="flex items-baseline gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-muted">
                {/* Ordinal is decoration: document order already conveys it, so
                    hiding it keeps the heading's accessible name clean. */}
                <span aria-hidden="true" className="text-foreground/40">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {group.category}
              </h3>
              <span aria-hidden="true" className="h-px flex-1 bg-foreground/15" />
            </div>

            <ul className="mt-5 flex flex-wrap gap-2.5">
              {group.skills.map((skill) => (
                // .tag sets border, padding and type; the flex utilities here
                // only add icon alignment, so there is nothing to conflict.
                // SkillIcon renders null for marks Simple Icons doesn't carry,
                // and gap collapses on its own, so no empty slot is left behind.
                <li key={skill} className="tag inline-flex items-center gap-2">
                  <SkillIcon name={skill} />
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