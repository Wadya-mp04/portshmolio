import { contactSchema, validateOne, type Contact } from '@/content/types';

const entry: Contact = {
  email: 'waddah.daker@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/waddah-daker-53aab9242/',
  githubUrl: 'https://github.com/Wadya-mp04',
};

export default validateOne(contactSchema, entry, 'content/contact');