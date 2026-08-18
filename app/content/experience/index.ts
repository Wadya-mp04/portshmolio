import { experienceSchema, validate, type Experience } from '@/content/types';

const entries: Experience[] = [
  {
    company: 'AW Design',
    role: 'Part-Time Software Developer',
    location: 'Remote',
    start: '2026-05',
    end: null, // null renders as "Present"
    bullets: [
      'Architected and shipped a production bilingual (EN/AR) site on a Next.js/TypeScript monorepo with 15+ Sanity CMS schemas, powering ~5 live client-facing pages deployed on Vercel',
      'Engineered a full i18n system (next-intl, dynamic [lang]/ routing) enabling seamless RTL/LTR content switching across the entire site for a global client base',
      'Extending the platform with a companion AWS-native page (S3, CloudFront, Route 53), applying cloud infrastructure patterns beyond the core Vercel stack',
    ],
    tech: ['Next.js', 'TypeScript', 'Sanity CMS', 'Vercel'],
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