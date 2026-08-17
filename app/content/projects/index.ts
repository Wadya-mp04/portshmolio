import { projectSchema, validate, type Project } from '@/content/types';

const entries: Project[] = [
  // TODO: replace with real content
  {
    name: 'Project Name',
    summary: 'One or two sentences on what this project does and why it exists.',
    tech: ['TypeScript', 'Next.js'],
    highlights: [
      'A notable technical decision, constraint, or result.',
    ],
    repoUrl: 'https://github.com/example/placeholder',
    // liveUrl is optional — omit it and the link simply will not render.
  },

  // ← add a new project here
];

export default validate(projectSchema, entries, 'content/projects');