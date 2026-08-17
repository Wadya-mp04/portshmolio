import { educationSchema, validate, type Education } from '@/content/types';

const entries: Education[] = [
  // TODO: replace with real content
  {
    institution: 'Institution Name',
    credential: 'Degree or Credential',
    field: 'Field of Study',
    start: '2016-09',
    end: '2020-06',
    notes: 'Optional line for honours, thesis, or focus area.',
  },

  // ← add a new qualification here (newest first)
];

export default validate(educationSchema, entries, 'content/education');