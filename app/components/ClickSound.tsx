'use client';

import { useEffect } from 'react';

const SRC = '/audio/mixkit-cool-interface-click-tone-2568.wav';

/**
 * Plays a click tone for any element carrying data-click-sound.
 *
 * One delegated listener on the document rather than a handler per control.
 * The alternative was a hook imported into each button, which would have forced
 * Hero — a Server Component holding the terminal and the whole intro — across
 * the client boundary just to attach an onClick to one anchor. This way the
 * only client code is here, and marking a control is one attribute.
 */
export default function ClickSound() {
  useEffect(() => {
    // Constructed once and rewound per play: a new Audio per click would
    // re-fetch on some browsers and leaves a growing pile of media elements.
    const audio = new Audio(SRC);
    audio.preload = 'auto';
    audio.volume = 0.35;

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest('[data-click-sound]')) return;

      audio.currentTime = 0;
      // Autoplay policy rejects until the user has interacted; this call is
      // inside a click so it is allowed, but the promise still rejects if the
      // file is missing or the tab is muted. Silence is the right failure.
      void audio.play().catch(() => {});
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}