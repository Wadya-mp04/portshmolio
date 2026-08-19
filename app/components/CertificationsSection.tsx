import certifications from '@/content/certifications';
import { formatIssued } from '@/lib/format';

/**
 * Deliberately not the shared .tag class: that is defined outside any cascade
 * layer in globals.css, so its `color: var(--muted)` outranks any text-* utility
 * put beside it and the status colour would silently do nothing.
 *
 * Shades are one step darker/lighter than the obvious pick — emerald-700 and
 * amber-700 measure 3.85:1 and 3.53:1 on the olive light palette, under AA.
 * These clear 4.5:1 on all four backgrounds the site ships.
 */
const STATUS = {
  completed: {
    label: 'Completed',
    className:
      'border-emerald-800/40 text-emerald-800 dark:border-emerald-300/40 dark:text-emerald-300',
  },
  'in-progress': {
    label: 'In progress',
    className:
      'border-amber-800/40 text-amber-800 dark:border-amber-300/40 dark:text-amber-300',
  },
} as const;

export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      aria-label="Certifications"
      className="mx-auto w-full max-w-5xl px-6 py-16"
    >
      <h2 className="section-heading">./Certifications</h2>

      <ul className="mt-8 space-y-4">
        {certifications.map((cert) => {
          const status = STATUS[cert.status];

          return (
            <li
              key={`${cert.issuer}-${cert.name}`}
              // `relative` anchors the stretched link below. The focus ring is
              // driven by has-[a:focus-visible] so it traces the card — the
              // actual click target — rather than just the title text.
              className={`relative rounded-lg border border-foreground/15 bg-foreground/[0.04] p-6 transition-colors has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-accent ${
                cert.credentialUrl ? 'hover:border-foreground/30 hover:bg-foreground/[0.08]' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-foreground sm:text-lg">
                    {cert.credentialUrl ? (
                      // after:absolute inset-0 stretches the hit area over the
                      // whole card while the link's accessible name stays just
                      // the credential, rather than every word in the card.
                      <a
                        href={cert.credentialUrl}
                        // Credentials live on the issuer's site (Credly, Udemy),
                        // so a new tab keeps the portfolio open behind them.
                        // Diverges from Projects, which navigates in place.
                        target="_blank"
                        rel="noopener noreferrer"
                        className="after:absolute after:inset-0 focus-visible:outline-none"
                      >
                        {cert.name}
                        {/* The arrow is the sighted cue for leaving the site;
                            this is its screen-reader equivalent. */}
                        <span className="sr-only"> — view credential, opens in a new tab</span>{' '}
                        <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      cert.name
                    )}
                  </h3>

                  <p className="mt-1.5 font-mono text-sm text-muted">
                    {cert.issuer}
                    {/* Absent while in progress, hence the guard rather than a
                        bare formatIssued() call. */}
                    {cert.issued && (
                      <>
                        {' · '}
                        <time dateTime={cert.issued}>{formatIssued(cert.issued)}</time>
                      </>
                    )}
                    {cert.expires && (
                      <>
                        {' · expires '}
                        <time dateTime={cert.expires}>{formatIssued(cert.expires)}</time>
                      </>
                    )}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-xs ${status.className}`}
                >
                  {status.label}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}