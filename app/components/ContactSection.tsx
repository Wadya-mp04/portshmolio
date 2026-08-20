import { Fragment } from 'react';
import contact from '@/content/contact';

/**
 * "https://www.linkedin.com/in/name/" → "linkedin.com/in/name".
 *
 * Derived rather than stored so the visible label and the href cannot drift
 * into showing one address and navigating to another.
 */
function displayUrl(url: string): string {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '');
}

export default function ContactSection() {
  const rows = [
    { label: 'Email', href: `mailto:${contact.email}`, text: contact.email, external: false },
    {
      label: 'LinkedIn',
      href: contact.linkedinUrl,
      text: displayUrl(contact.linkedinUrl),
      external: true,
    },
    {
      label: 'GitHub',
      href: contact.githubUrl,
      text: displayUrl(contact.githubUrl),
      external: true,
    },
  ];

  return (
    // <footer>, and rendered outside <main> in page.tsx: this is the site's
    // contentinfo landmark, which the page previously had none of. The #contact
    // anchor and Nav's observer work the same either way.
    <footer
      id="contact"
      aria-label="Contact"
      className="mx-auto w-full max-w-5xl px-6 pt-16 pb-24"
    >
      <h2 className="section-heading">./Contact</h2>

      {/* The section's own h2 is ./Contact, so this is an h3 rather than a
          second h2 — it is a subhead, not a sibling section. */}
      <h3 className="mt-8 max-w-3xl text-5xl font-semibold tracking-tight text-foreground text-balance sm:text-6xl lg:text-7xl">
        Let&rsquo;s get acquainted!
      </h3>

      {/* dl, not ul: these are label/value pairs, and a description list says so
          to a screen reader without any extra markup. */}
      <dl className="mt-14 grid gap-x-8 gap-y-5 sm:grid-cols-[8rem_minmax(0,1fr)]">
        {rows.map((row) => (
          <Fragment key={row.label}>
            <dt className="font-mono text-sm uppercase tracking-[0.18em] text-muted">
              {row.label}
            </dt>
            <dd className="font-mono text-base sm:text-lg">
              <a
                href={row.href}
                // mailto: gets neither — target="_blank" on a mail link opens a
                // blank tab that never closes in most browsers.
                target={row.external ? '_blank' : undefined}
                rel={row.external ? 'noopener noreferrer' : undefined}
                className="text-accent underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {row.text}
                {row.external && <span className="sr-only">, opens in a new tab</span>}{' '}
                <span aria-hidden="true">↗</span>
              </a>
            </dd>
          </Fragment>
        ))}
      </dl>

      <p className="mt-20 text-right font-mono text-xs text-muted">
        {/* Evaluated at build time — a static export has no runtime, so this
            updates whenever the site is rebuilt rather than on New Year's Day. */}
        © {new Date().getFullYear()} Waddah Daker. All rights reserved.
      </p>
    </footer>
  );
}