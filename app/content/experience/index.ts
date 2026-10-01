import { experienceSchema, validate, type Experience } from '@/content/types';

const entries: Experience[] = [
  {
    company: 'AW Design',
    role: 'Part-Time Software Developer',
    location: 'Remote',
    start: '2026-05',
    end: null, // null renders as "Present"
    bullets: [
      'Shipped a bilingual Next.js/TypeScript site with 15+ Sanity CMS schemas and RTL/LTR i18n ',
      'Designed a serverless AWS recruitment portal (Lambda, DynamoDB, SES) for 3 branches, targeting $5/mo',
      'Set up the firm’s AWS account from scratch with MFA-secured root and role-based, least-privilege IAM access',
    ],
    tech: ['Next.js', 'TypeScript', 'Sanity CMS', 'Vercel','AWS','Microsoft Entra ID'],
    logo: '/logos/awd-logo.svg',
  },
  {
    // "(Summers)" folded into the role: the schema stores month precision only,
    // and "Jun 2019 – Sep 2020" alone would read as 15 continuous months.
    company: 'Artware',
    role: 'Architectural Design Intern (Summers)',
    location: 'Damascus, Syria',
    start: '2019-06',
    end: '2020-09',
    bullets: [
      'Modeled and delivered 3D renders for 5+ concurrent design projects using SketchUp and AutoCAD, maintaining a structured digital asset library and validating design accuracy through on-site inspections',
    ],
    tech: ['SketchUp', 'AutoCAD'],
    logo: '/logos/awd-logo.svg',
  },

  // ← add a new role here (newest first)
];

export default validate(experienceSchema, entries, 'content/experience');