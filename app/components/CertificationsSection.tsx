import certifications from '@/content/certifications';
import { formatMonth } from '@/lib/format';

export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      aria-label="Certifications"
      className="mx-auto w-full max-w-5xl px-6 py-16"
    >
      <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
        Certifications
      </h2>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {certifications.map((cert) => (
          <li
            key={`${cert.issuer}-${cert.name}`}
            className="rounded-lg border border-foreground/15 bg-foreground/[0.04] p-5"
          >
            <h3 className="text-base font-semibold text-foreground">{cert.name}</h3>
            <p className="mt-1 text-sm text-muted">{cert.issuer}</p>

            <p className="mt-3 font-mono text-xs text-muted">
              Issued <time dateTime={cert.issued}>{formatMonth(cert.issued)}</time>
              {cert.expires && (
                <>
                  {' · expires '}
                  <time dateTime={cert.expires}>{formatMonth(cert.expires)}</time>
                </>
              )}
            </p>

            {cert.credentialUrl && (
              <p className="mt-4 font-mono text-sm">
                <a
                  href={cert.credentialUrl}
                  className="text-accent underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Verify<span className="sr-only"> {cert.name}</span> <span aria-hidden="true">↗</span>
                </a>
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}