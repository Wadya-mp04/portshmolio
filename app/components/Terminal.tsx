import about from '@/content/about';

/**
 * The terminal card on its own, with no section wrapper or width constraint —
 * those belong to whatever places it. Extracted so the hero and About render
 * the same markup rather than two copies that drift.
 */
export default function Terminal() {
  return (
    <div className="terminal w-full rounded-lg p-6 font-mono text-sm sm:p-8">
      {/* Chrome: decorative in full. */}
      <div aria-hidden="true" className="terminal-dim mb-8 flex items-center gap-4">
        <span className="flex gap-2">
          <span className="size-2.5 rounded-full bg-current" />
          <span className="size-2.5 rounded-full bg-current" />
          <span className="size-2.5 rounded-full bg-current" />
        </span>
        <span className="text-xs uppercase tracking-[0.2em]">{about.window}</span>
      </div>

      <pre
        aria-hidden="true"
        className="terminal-dim mb-10 overflow-x-auto text-[0.5rem] leading-tight sm:text-xs"
      >
        {about.banner}
      </pre>

      <div className="space-y-8">
        {about.commands.map((entry) => (
          <div key={entry.command}>
            <p>
              {/* Only the prompt is hidden — "you@workstation:~$" read aloud is
                  noise, whereas the command itself labels the output below it. */}
              <span aria-hidden="true" className="terminal-dim">
                {about.prompt}{' '}
              </span>
              {entry.command}
            </p>

            {entry.style === 'quote' ? (
              <blockquote className="terminal-quote mt-4 ml-2 space-y-3 pl-4 italic">
                {entry.output.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </blockquote>
            ) : (
              <div className="mt-4 ml-2 space-y-3 pl-4">
                {entry.output.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Trailing prompt with a blinking caret — pure flavour. */}
        <p aria-hidden="true" className="terminal-dim">
          {about.prompt} <span className="terminal-cursor" />
        </p>
      </div>
    </div>
  );
}