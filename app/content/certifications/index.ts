import { certificationSchema, validate, type Certification } from '@/content/types';

const entries: Certification[] = [
  // TODO: replace with real content
  {
    name: 'Certification Name',
    issuer: 'Issuing Body',
    issued: '2024-03',
    // expires and credentialUrl are optional — omit for credentials that
    // do not lapse or have no public verification link.
    expires: '2027-03',
    credentialUrl: 'https://example.com/verify/placeholder',
  },

  // ← add a new certification here (newest first)
];

export default validate(certificationSchema, entries, 'content/certifications');