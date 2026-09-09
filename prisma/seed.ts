import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.skill.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.category.deleteMany({});

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: { name: 'Web Development', description: 'Frontend and backend web applications' },
    }),
    prisma.category.create({
      data: { name: 'Game Development', description: 'Game development projects' },
    }),
    prisma.category.create({
      data: { name: 'Tools & Utilities', description: 'Developer tools and utilities' },
    }),
  ]);

  console.log(`Created ${categories.length} categories`);

  // Create projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        slug: 'game-guide-management',
        name: 'Game Guide Management',
        description: 'A comprehensive web application for managing and sharing game guides.',
        longDescription:
          'Full-stack application built with React, Node.js, TypeScript, REST API, and SFTP integration. Features include guide creation, community voting, and user authentication. Demonstrates clean architecture, API design, and real-time collaboration.',
        technologies: ['React', 'Node.js', 'TypeScript', 'REST API', 'SFTP', 'PostgreSQL'],
        category: 'Web Development',
        featured: true,
        year: 2023,
        githubUrl: 'https://github.com/lucadifrancesco/game-guide-management',
      },
    }),
    prisma.project.create({
      data: {
        slug: 'clipforge',
        name: 'ClipForge',
        description: 'AI-powered video clip creation tool with intelligent scene detection.',
        longDescription:
          'A SaaS application that leverages AI to automatically detect and extract interesting moments from video content. Built with React for a smooth UX, Node.js backend for processing, and integration with popular AI APIs. Demonstrates knowledge of modern web patterns, async processing, and API integration.',
        technologies: ['React', 'Node.js', 'AI APIs', 'TypeScript', 'PostgreSQL', 'Docker'],
        category: 'Web Development',
        featured: true,
        year: 2024,
        githubUrl: 'https://github.com/lucadifrancesco/clipforge',
      },
    }),
    prisma.project.create({
      data: {
        slug: 'convoium',
        name: 'Convoium',
        description: 'Real-time collaborative conversation analysis platform.',
        longDescription:
          'A platform for analyzing conversations with AI-powered insights. Built with React, Node.js, and WebSocket for real-time updates. Features include transcription, sentiment analysis, and collaborative workspace. Demonstrates full-stack TypeScript, real-time communication, and complex state management.',
        technologies: ['React', 'Node.js', 'WebSockets', 'TypeScript', 'REST API', 'PostgreSQL'],
        category: 'Web Development',
        featured: true,
        year: 2024,
        githubUrl: 'https://github.com/lucadifrancesco/convoium',
      },
    }),
  ]);

  console.log(`Created ${projects.length} projects`);

  // Create skills
  const skills = await Promise.all([
    // Frontend
    prisma.skill.create({
      data: {
        name: 'React',
        category: 'Frontend',
        description: 'Building modern React applications with hooks and composition',
        level: 'advanced',
      },
    }),
    prisma.skill.create({
      data: {
        name: 'TypeScript',
        category: 'Frontend',
        description: 'Type-safe JavaScript development',
        level: 'advanced',
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Angular',
        category: 'Frontend',
        description: 'Enterprise-scale Angular applications',
        level: 'intermediate',
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Tailwind CSS',
        category: 'Frontend',
        description: 'Utility-first CSS framework',
        level: 'advanced',
      },
    }),
    // Backend
    prisma.skill.create({
      data: {
        name: 'Node.js',
        category: 'Backend',
        description: 'JavaScript runtime for server-side development',
        level: 'advanced',
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Express',
        category: 'Backend',
        description: 'Minimalist web framework for Node.js',
        level: 'advanced',
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Fastify',
        category: 'Backend',
        description: 'High-performance web framework',
        level: 'intermediate',
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Java',
        category: 'Backend',
        description: 'Object-oriented programming and enterprise systems',
        level: 'intermediate',
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Spring Boot',
        category: 'Backend',
        description: 'Java framework for building web applications',
        level: 'intermediate',
      },
    }),
    // Database
    prisma.skill.create({
      data: {
        name: 'PostgreSQL',
        category: 'Database',
        description: 'Advanced open-source relational database',
        level: 'advanced',
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Prisma',
        category: 'Database',
        description: 'Modern ORM for type-safe database access',
        level: 'advanced',
      },
    }),
    prisma.skill.create({
      data: {
        name: 'SQL',
        category: 'Database',
        description: 'Relational database queries and optimization',
        level: 'advanced',
      },
    }),
    // DevOps
    prisma.skill.create({
      data: {
        name: 'Docker',
        category: 'DevOps',
        description: 'Containerization and application deployment',
        level: 'advanced',
      },
    }),
    prisma.skill.create({
      data: {
        name: 'GitHub Actions',
        category: 'DevOps',
        description: 'CI/CD automation and workflow orchestration',
        level: 'intermediate',
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Git',
        category: 'DevOps',
        description: 'Version control and collaboration',
        level: 'advanced',
      },
    }),
    // Game Development
    prisma.skill.create({
      data: {
        name: 'Unity',
        category: 'Game Development',
        description: 'Game engine for 2D and 3D games',
        level: 'intermediate',
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Unreal Engine',
        category: 'Game Development',
        description: 'Professional game engine with C++',
        level: 'beginner',
      },
    }),
  ]);

  console.log(`Created ${skills.length} skills`);
  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
