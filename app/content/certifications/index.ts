import { certificationSchema, validate, type Certification } from '@/content/types';

const entries: Certification[] = [
  {
    name: 'Docker for the Absolute Beginner - Hands On - DevOps',
    issuer: 'Udemy',
    status:'in-progress',
    credentialUrl: 'https://www.udemy.com/course/learn-docker/'
  },
  {
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    status: 'completed',
    // Year only, per the CV — set the month if you want "Mar 2026" instead.
    issued: '2026',
    credentialUrl: 'https://www.credly.com/badges/cbed6eac-832e-496e-9c23-2c28fc7cb77b',
  },
  {
    name: 'Full-Stack Web Development',
    issuer: 'Udemy',
    status: 'completed',
    // Year only: the CV gives no month, and inventing one would put a date on
    // the page that isn't yours. formatIssued renders this as plain "2025".
    issued: '2025',
    credentialUrl: 'https://www.udemy.com/certificate/UC-8295c266-099a-473e-9f52-0ad0dc94f810/',
  },

  // ← add a new certification here (newest first)
];

export default validate(certificationSchema, entries, 'content/certifications');