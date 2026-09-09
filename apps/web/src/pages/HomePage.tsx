import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { profile } from '../config/profile';
import { apiClient } from '../lib/api';

interface HomePageProps {
  onNavigate: (page: string, projectSlug?: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { data: projects } = useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: () => apiClient.getProjects(true),
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="space-y-20 py-12">
      {/* Hero Section */}
      <motion.section
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-6 py-20">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {profile.name}
              </span>
            </h1>
          </motion.div>

          <motion.p
            className="text-2xl md:text-3xl text-slate-300 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {profile.role}
          </motion.p>

          <motion.p
            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {profile.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <button
              onClick={() => onNavigate('projects')}
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold rounded-lg transition-colors"
            >
              View My Work
            </button>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-slate-600 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 font-semibold rounded-lg transition-colors"
            >
              GitHub →
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-slate-600 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 font-semibold rounded-lg transition-colors"
            >
              LinkedIn →
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Tech Stack Section */}
      <motion.section
        className="max-w-6xl mx-auto py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">Tech Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            'React',
            'TypeScript',
            'Node.js',
            'Java',
            'Spring Boot',
            'PostgreSQL',
            'Docker',
            'Git',
          ].map((tech) => (
            <motion.div
              key={tech}
              className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-lg text-center hover:border-cyan-400/50 hover:bg-slate-800/80 transition-all cursor-pointer"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-semibold text-slate-200">{tech}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Featured Projects */}
      {projects && projects.length > 0 && (
        <motion.section
          className="max-w-6xl mx-auto py-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.slice(0, 2).map((project) => (
              <motion.div
                key={project.id}
                className="group p-6 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-cyan-400/50 hover:bg-slate-800/80 transition-all cursor-pointer"
                variants={itemVariants}
                onClick={() => onNavigate('project-detail', project.slug)}
                whileHover={{ y: -4 }}
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-cyan-400 group-hover:text-cyan-300">
                    {project.name}
                  </h3>
                  <p className="text-slate-400">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-700/50 text-slate-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-slate-700/50 text-slate-300 text-sm rounded-full">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 pt-4">
                    View Case Study →
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('projects')}
              className="px-8 py-3 border border-slate-600 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 font-semibold rounded-lg transition-colors"
            >
              View All Projects
            </button>
          </div>
        </motion.section>
      )}

      {/* Engineering Section */}
      <motion.section
        className="max-w-6xl mx-auto py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4 text-center">How I Build Software</h2>
        <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
          These principles guide every decision, from architecture to implementation
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(profile.principles).map(([principle, description]) => (
            <motion.div
              key={principle}
              className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-lg"
              variants={itemVariants}
            >
              <h3 className="text-lg font-bold text-cyan-400 mb-3">{principle}</h3>
              <p className="text-slate-400">{description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
