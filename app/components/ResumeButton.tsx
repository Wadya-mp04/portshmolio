'use client';

import { useState } from 'react';

/**
 * Client-side only for the flight state — the hover lift is pure CSS and needs
 * no JS, but replaying an animation on demand does.
 */
export default function ResumeButton() {
  /**
   * Counts flights rather than storing a boolean, because it doubles as the
   * element key. Re-setting a data attribute that is already 'true' does not
   * restart a CSS animation, so a second click would do nothing; remounting on
   * a new key restarts it every time.
   */
  const [flight, setFlight] = useState<number | null>(null);

  return (
    <span className="resume-button">
      <span
        // Back to 'idle' once the flight ends, which remounts the sheet at rest
        // so it is concealed again and hover works on the next pass.
        key={flight ?? 'idle'}
        aria-hidden="true"
        className="resume-paper"
        data-flying={flight === null ? undefined : 'true'}
        onAnimationEnd={() => setFlight(null)}
      />

      <a
        href="/resume.pdf"
        // `download` rather than a plain link: navigating away would unload the
        // page mid-animation. This keeps the user here, so the sheet flying
        // down doubles as the download's own feedback.
        download="Waddah-Daker-Resume.pdf"
        data-click-sound
        onClick={() => setFlight((count) => (count ?? 0) + 1)}
        className="rounded-md border border-foreground/30 px-5 py-2.5 font-mono text-sm text-foreground transition duration-200 hover:border-foreground/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:active:scale-95"
      >
        Resume
        <span className="sr-only"> (PDF, downloads)</span>
      </a>
    </span>
  );
}