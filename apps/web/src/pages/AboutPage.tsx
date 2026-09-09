import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../config/profile';

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto py-12 space-y-12"
    >
      <div className="space-y-6">
        <h1 className="text-5xl font-bold">About Me</h1>
        <p className="text-xl text-slate-400">
          Software Engineer focused on building scalable and well-designed digital products.
        </p>
      </div>

      <div className="prose prose-invert max-w-none space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-bold">Who I Am</h2>
          <p className="text-slate-300 leading-relaxed">
            I'm a Software Engineer with diverse experience across frontend, backend, and full-stack
            development. I specialize in building modern web applications with React, Node.js, and
            TypeScript, with a strong foundation in database design and system architecture.
          </p>
          <p className="text-slate-300 leading-relaxed">
            My approach to software engineering emphasizes clean code, type safety, comprehensive
            testing, and performance optimization. I believe in writing code that is not just
            functional, but also maintainable and a pleasure to work with.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-bold">My Experience</h2>
          <p className="text-slate-300 leading-relaxed">
            I have experience developing full-stack applications, from conceptualization through
            deployment. My background includes:
          </p>
          <ul className="space-y-2 text-slate-300 list-disc list-inside">
            <li>Frontend development with React and modern frameworks</li>
            <li>Backend development with Node.js, Express, and Fastify</li>
            <li>Database design and optimization with PostgreSQL</li>
            <li>API design and documentation</li>
            <li>DevOps and containerization with Docker</li>
            <li>CI/CD pipelines and automation</li>
            <li>Game development with Unity and Unreal Engine</li>
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-bold">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(profile.skills).map(([category, skills]) => (
              <div key={category} className="space-y-3">
                <h3 className="font-bold text-cyan-400 capitalize">
                  {category.replace(/([A-Z])/g, ' $1')}
                </h3>
                <ul className="space-y-2 text-slate-300 list-disc list-inside">
                  {skills.map((skill) => (
                    <li key={skill.name}>{skill.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-bold">What I Value</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
              <h3 className="font-bold text-cyan-400 mb-2">Clean Code</h3>
              <p className="text-slate-400 text-sm">
                Code should be readable, maintainable, and self-documenting.
              </p>
            </div>
            <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
              <h3 className="font-bold text-cyan-400 mb-2">Type Safety</h3>
              <p className="text-slate-400 text-sm">
                TypeScript catches errors early and improves code quality.
              </p>
            </div>
            <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
              <h3 className="font-bold text-cyan-400 mb-2">Testing</h3>
              <p className="text-slate-400 text-sm">
                Well-tested code is maintainable code that prevents regressions.
              </p>
            </div>
            <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
              <h3 className="font-bold text-cyan-400 mb-2">Performance</h3>
              <p className="text-slate-400 text-sm">
                Fast applications provide better user experiences.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-3xl font-bold">Let's Connect</h2>
          <p className="text-slate-300 leading-relaxed">
            I'm always interested in discussing software engineering, new technologies, or potential
            opportunities. Feel free to reach out.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold rounded-lg transition-colors"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-950 font-semibold rounded-lg transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="px-6 py-2 border border-slate-600 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 font-semibold rounded-lg transition-colors"
            >
              Email
            </a>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
