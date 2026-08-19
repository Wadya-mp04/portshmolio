import projects from '@/content/projects';

/** Shared by every link in the row — matches the anchor style used sitewide. */
const LINK_CLASS =
  'text-accent underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-label="Projects"
      className="mx-auto w-full max-w-5xl px-6 py-16"
    >
      <h2 className="section-heading">./Projects</h2>

      <ul className="mt-8 space-y-4">
        {projects.map((project) => {
          /**
           * Built as a list so the three anchors share one piece of markup.
           * repoUrl is first and unconditional — the schema requires it, so
           * this row is never empty and needs no guard.
           */
          const links = [
            { href: project.repoUrl, label: 'Github', context: 'code' },
            ...(project.demoUrl
              ? [{ href: project.demoUrl, label: 'Demo', context: 'video' }]
              : []),
            ...(project.devpostUrl
              ? [{ href: project.devpostUrl, label: 'DevPost', context: 'writeup' }]
              : []),
          ];

          return (
            <li
              key={project.name}
              className="rounded-lg border border-foreground/15 bg-foreground/[0.04] p-6"
            >
              {/* No stretched card link here, unlike Certifications: a card-wide
                  anchor cannot contain the Demo and DevPost anchors without
                  making them unreachable by keyboard. */}
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-base font-semibold text-foreground sm:text-lg">
                  {project.name}
                </h3>
                <span className="shrink-0 font-mono text-sm text-muted">{project.year}</span>
              </div>

              <p className="mt-2 text-muted">{project.summary}</p>

              {project.tech.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2.5" aria-label="Technologies used">
                  {project.tech.map((item) => (
                    <li key={item} className="tag">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              <p className="mt-5 flex flex-wrap gap-5 font-mono text-sm">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    // New tab, matching Certifications: these all leave the site
                    // to view an artefact hosted elsewhere.
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK_CLASS}
                  >
                    {/* Named so the link still makes sense read out of context —
                        "Source" alone is meaningless in a list of 15 links. */}
                    {link.label}
                    <span className="sr-only">
                      {' '}
                      {link.context} for {project.name}, opens in a new tab
                    </span>{' '}
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}