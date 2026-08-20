import { skillGroupSchema, validate, type SkillGroup } from '@/content/types';

/**
 * Sourced from the CV's "Technical Skills" block, plus the stack this site is
 * built on. The CV's own four headings are not reused: its "Tools &
 * Technologies" row mixes databases, an OS and a cloud in with editors, which
 * is fine on one printed line but reads as a grab bag once each row is its own
 * labelled block. These four split on what a thing *is*.
 *
 * Order matters twice over: groups are numbered by position in this array, and
 * skills render in the order given — so lead each group with what you most want
 * read first.
 */
const entries: SkillGroup[] = [
  {
    category: 'Languages',
    // "HTML/CSS" on the CV, split here because they carry separate marks.
    skills: [
      'Python',
      'Java',
      'JavaScript',
      'TypeScript',
      'C',
      'C++',
      'HTML',
      'CSS',
    ],
  },
  {
    category: 'Frameworks & Libraries',
    // CV order first, then the four this portfolio itself is built with.
    skills: [
      'React',
      'Next.js',
      'Node.js',
      'Express',
      'FastAPI',
      'Pandas',
      'NumPy',
      'PyTorch',
      'Scikit-Learn',
      'Tailwind CSS',
    ],
  },
  {
    // Things you deploy onto or run against, rather than write with: clouds,
    // the CDN/DNS pair from the AW Design bullet, datastores, the OS.
    category: 'Platforms & Infrastructure',
    skills: [
      'AWS',
      'Vercel',
      'Docker',
      'Linux',
      'PostgreSQL',
      'MySQL',
      'Sanity CMS',
    ],
  },
  {
    category: 'Tools',
    // SketchUp and AutoCAD trail the software tooling — kept because the 3D/CAD
    // background is genuinely unusual next to the web stack.
    skills: [
      'Git',
      'GitHub',
      'Postman',
      'Wireshark',
      'ESLint',
      'SketchUp',
      'Jupyter Notebook'
    ],
  },

  // ← add a new skill group here
];

export default validate(skillGroupSchema, entries, 'content/skills');