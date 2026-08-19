'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
import type { Experience } from '@/content/types';
import { formatRange } from '@/lib/format';

/**
 * Code-split so three.js (~170KB gz) is only fetched when a logo actually
 * renders — which is only while pinned, i.e. never below lg.
 */
const LogoAscii = dynamic(() => import('@/components/LogoAscii'), { ssr: false });

/** Pinned mode is opt-in: wide viewport AND no reduced-motion preference. */
const PINNED_QUERY = '(min-width: 64rem) and (prefers-reduced-motion: no-preference)';

function subscribe(onChange: () => void) {
  const query = window.matchMedia(PINNED_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

/**
 * useSyncExternalStore rather than useEffect + setState: reading a media query
 * synchronously in an effect body trips react-hooks/set-state-in-effect, and
 * this gives a proper server snapshot too — the static export renders the
 * timeline view, which is the one that works without JS.
 */
function usePinned() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(PINNED_QUERY).matches,
    () => false,
  );
}

export default function ExperienceScroller({ roles }: { roles: Experience[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pinned = usePinned();
  const [activeIndex, setActiveIndex] = useState(0);
  const [fill, setFill] = useState(0);

  // Pinned: map scroll position within the tall track onto role index + fill.
  useEffect(() => {
    if (!pinned) return;
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      const scaled = progress * roles.length;
      const index = Math.min(Math.floor(scaled), roles.length - 1);

      setActiveIndex(index);
      setFill(Math.min(scaled - index, 1));
    };

    const onScroll = () => {
      // rAF-coalesced: scroll fires far more often than we can paint.
      if (!frame) frame = requestAnimationFrame(measure);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // Deferred rather than called inline, so the initial setState lands outside
    // the effect body.
    frame = requestAnimationFrame(measure);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pinned, roles.length]);

  // No observer for the timeline view: markers are hover-driven in CSS, so
  // `activeIndex` is only meaningful while pinned.

  const activeLogo = roles[activeIndex]?.logo;

  return (
    <div
      ref={trackRef}
      className="xp-track"
      style={{ '--xp-count': roles.length } as React.CSSProperties}
    >
      <div className="xp-stage">
        <span
          aria-hidden="true"
          className="xp-progress"
          style={{ '--xp-fill': fill } as React.CSSProperties}
        />

        {/* One renderer for the whole section, showing the active role's logo.
            Per-role canvases would mean N WebGL contexts with N-1 of them
            drawing something invisible, since only one role is ever shown. */}
        {pinned && activeLogo && <LogoAscii key={activeLogo} src={activeLogo} />}

        <ol className="xp-list">
          {roles.map((role, index) => (
            <li
              key={`${role.company}-${role.start}`}
              data-state={
                index === activeIndex ? 'active' : index < activeIndex ? 'before' : 'after'
              }
              className="tl-item"
            >
              <span aria-hidden="true" className="tl-marker" />

              <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {role.role}
              </h3>

              <p className="mt-3 font-mono text-sm text-muted">
                {role.company} · {role.location} ·{' '}
                <time dateTime={role.start}>{formatRange(role.start, role.end)}</time>
              </p>

              <ul className="mt-8 list-disc space-y-4 pl-5 text-lg text-foreground marker:text-accent sm:text-xl">
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              {role.tech.length > 0 && (
                <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies used">
                  {role.tech.map((item) => (
                    <li
                      key={item}
                      className="tag"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}