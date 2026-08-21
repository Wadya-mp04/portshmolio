'use client';

import { useTheme } from 'next-themes';

/**
 * No `mounted` guard and no effect: which word shows is decided purely by CSS
 * off the `.dark` class that next-themes writes to <html> before hydration.
 * That sidesteps the server/client mismatch entirely and renders correctly even
 * before JS loads. Both words are in the DOM at once — that's what allows the
 * cross-fade — so they're aria-hidden and the button takes its accessible name
 * from aria-label instead.
 *
 * Motion lives in globals.css under the `.tt-*` classes.
 */
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      data-click-sound
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle light and dark theme"
      className="tt shrink-0 rounded-md px-2 py-1 font-mono text-sm text-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span aria-hidden="true" className="tt-bracket tt-bracket--left">
        [
      </span>

      <span aria-hidden="true" className="tt-slot">
        <span className="tt-word tt-word--bright">Too Bright ?</span>
        <span className="tt-word tt-word--dark">Too Dark ?</span>
      </span>

      <span aria-hidden="true" className="tt-bracket tt-bracket--right">
        ]
      </span>
    </button>
  );
}