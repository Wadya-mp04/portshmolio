import { experienceSchema, validate, type Experience } from '@/content/types';

const entries: Experience[] = [
  // TODO: replace with real content
  {
    company: 'Company Name',
    role: 'Your Role',
    location: 'City, Country',
    start: '2020-01',
    end: null, // null renders as "Present"
    bullets: [
      'What you owned here, and the outcome it produced.',
      'A second bullet, ideally with a number attached to it.',
    ],
    tech: ['TypeScript', 'AWS'],
  },

  // ← add a new role here (newest first)
];

export default validate(experienceSchema, entries, 'content/experience');