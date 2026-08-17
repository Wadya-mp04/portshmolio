import { skillGroupSchema, validate, type SkillGroup } from '@/content/types';

const entries: SkillGroup[] = [
  // TODO: replace with real content
  {
    category: 'Category Name',
    skills: ['Skill one', 'Skill two', 'Skill three'],
  },

  // ← add a new skill group here
];

export default validate(skillGroupSchema, entries, 'content/skills');