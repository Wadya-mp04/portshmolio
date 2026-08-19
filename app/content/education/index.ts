import { educationSchema, validate, type Education } from '@/content/types';

const entries: Education[] = [
  {
    institution: 'Concordia University',
    // `field` omitted: the credential already names it.
    credential: 'Bachelor of Computer Science',
    location: 'Montreal, QC',
    start: '2023-09',
    end: null, // null renders as "Present"
    coursework: [
      'Data Structures & Algorithms',
      'Operating Systems',
      'Computer Networks',
      'Databases',
      'Information Retrieval',
      'Computer Vision',
      'Web Development',
      "Object Oriented Porgramming (Java)",
      "Machine Learning",
      "Software Engineering"
    ],
    notes: 'GPA: 3.6/4.3',
  },
  {
    institution: 'American University of Sharjah',
    credential: 'Bachelor of Computer Science',
    location: 'Sharjah, UAE',
    start: '2022-09',
    end: '2023-04',
    coursework: ["Object Oriented Porgramming (C++)"],
    notes: 'GPA: 3.9/4.0',
  },

  // ← add a new qualification here (newest first)
];

export default validate(educationSchema, entries, 'content/education');