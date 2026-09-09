export const profile = {
  name: 'Luca Di Francesco',
  role: 'Software Engineer',
  bio: 'Software Engineer focused on building scalable, performant and well-designed digital products.',
  email: 'your.email@example.com',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourprofile',
  location: 'Your Location',
  
  // Social links
  links: {
    github: 'GitHub',
    linkedin: 'LinkedIn',
  },

  // Tech stack
  technologies: {
    frontend: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    backend: ['Node.js', 'Express', 'Fastify', 'PostgreSQL'],
    tools: ['Docker', 'Git', 'GitHub Actions'],
    other: ['Java', 'Spring Boot', 'Unity', 'Unreal Engine'],
  },

  // Engineering principles
  principles: {
    'Clean Architecture': 'Building systems with clear separation of concerns and maintainable code structure.',
    'Type Safety': 'Using TypeScript to catch errors at compile time and improve developer experience.',
    'Testing': 'Writing meaningful tests that validate behavior and prevent regressions.',
    'Performance': 'Optimizing applications for speed, efficiency, and excellent user experience.',
  },

  // Skills by category
  skills: {
    frontend: [
      { name: 'React', level: 'advanced' },
      { name: 'TypeScript', level: 'advanced' },
      { name: 'Tailwind CSS', level: 'advanced' },
      { name: 'Angular', level: 'intermediate' },
    ],
    backend: [
      { name: 'Node.js', level: 'advanced' },
      { name: 'Express', level: 'advanced' },
      { name: 'Fastify', level: 'intermediate' },
      { name: 'Java', level: 'intermediate' },
      { name: 'Spring Boot', level: 'intermediate' },
    ],
    database: [
      { name: 'PostgreSQL', level: 'advanced' },
      { name: 'Prisma', level: 'advanced' },
      { name: 'SQL', level: 'advanced' },
    ],
    devops: [
      { name: 'Docker', level: 'advanced' },
      { name: 'Git', level: 'advanced' },
      { name: 'GitHub Actions', level: 'intermediate' },
    ],
    gamedev: [
      { name: 'Unity', level: 'intermediate' },
      { name: 'Unreal Engine', level: 'beginner' },
    ],
  },
};

export type Profile = typeof profile;
