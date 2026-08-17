'use client';

import { useEffect, useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
];

export default function Nav() {
  // Empty until a section reaches the detection band — at the top of the page
  // the hero is on screen and no nav item should be highlighted.
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const elements = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        // setState inside an observer callback is a subscription update, not a
        // synchronous effect-body write, so it doesn't cascade renders.
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      {
        // Collapses the viewport to a thin band across its middle. Whichever
        // section crosses that band is "current", which tracks reading position
        // far better than "topmost visible section".
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-2">
        {/* #top is the hero section's id. */}
        <a
          href="#top"
          className="shrink-0 rounded px-2 py-1 font-mono text-sm font-semibold text-muted transition duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:active:scale-95"
        >
          [PORTFOLIO_V1.1]
        </a>

        {/* Hidden below lg. The six labels plus brand and toggle need ~869px;
            md would overflow by ~150px and force a scrolling bar, which is what
            we were trying to avoid. The landmark disappears with the links,
            which is correct — there is no navigation to announce on a phone. */}
        <nav aria-label="Section navigation" className="hidden min-w-0 flex-1 lg:block">
          <ul className="flex gap-1">
            {SECTIONS.map(({ id, label }) => {
              const isActive = id === activeId;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`block whitespace-nowrap rounded px-2 py-1 font-mono text-sm transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:active:scale-95 ${
                      isActive ? 'text-foreground' : 'text-muted hover:text-foreground'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}