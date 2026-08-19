import projects from '@/content/projects';

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-label="Projects"
      className="mx-auto w-full max-w-5xl px-6 py-16"
    >
      <h2 className="section-heading">./Projects</h2>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <li
            key={project.name}
            className="flex flex-col rounded-lg border border-foreground/15 bg-foreground/[0.04] p-5"
          >
            <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
            <p className="mt-2 text-muted">{project.summary}</p>

            {project.highlights.length > 0 && (
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-foreground marker:text-muted">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}

            {project.tech.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
                {project.tech.map((item) => (
                  <li
                    key={item}
                    className="tag"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {/* mt-auto pins the links to the card bottom so cards in a row align. */}
            {(project.repoUrl ?? project.liveUrl) && (
              <p className="mt-auto flex flex-wrap gap-4 pt-5 font-mono text-sm">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    className="text-accent underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {/* Link text names the project, so it still makes sense out of context. */}
                    Source<span className="sr-only"> code for {project.name}</span> <span aria-hidden="true">↗</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    className="text-accent underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Live<span className="sr-only"> site for {project.name}</span> <span aria-hidden="true">↗</span>
                  </a>
                )}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}