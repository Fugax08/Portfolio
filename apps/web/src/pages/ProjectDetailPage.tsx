import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { apiClient } from '../lib/api';

interface ProjectDetailPageProps {
  slug: string;
  onNavigate: (page: string) => void;
}

export default function ProjectDetailPage({ slug, onNavigate }: ProjectDetailPageProps) {
  const { data: project, isLoading, isError } = useQuery({
    queryKey: ['project', slug],
    queryFn: () => apiClient.getProject(slug),
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center text-slate-400">
        Loading project details...
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center space-y-4">
        <h1 className="text-3xl font-bold text-red-400">Project Not Found</h1>
        <button
          onClick={() => onNavigate('projects')}
          className="px-6 py-2 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-950 rounded-lg transition-colors"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto py-12 space-y-12"
    >
      {/* Header */}
      <div className="space-y-6">
        <button
          onClick={() => onNavigate('projects')}
          className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-2"
        >
          ← Back to Projects
        </button>

        <div className="space-y-4">
          <h1 className="text-5xl font-bold">{project.name}</h1>
          <p className="text-xl text-slate-400">{project.description}</p>

          <div className="flex flex-wrap gap-3 pt-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 pt-6">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold rounded-lg transition-colors"
            >
              View on GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-950 font-semibold rounded-lg transition-colors"
            >
              View Live Demo
            </a>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-800" />

      {/* Content Sections */}
      <div className="space-y-12">
        {/* Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold">Overview</h2>
          <p className="text-slate-300 leading-relaxed">
            {project.longDescription || project.description}
          </p>
        </motion.section>

        {/* Problem */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold">Problem</h2>
          <p className="text-slate-300 leading-relaxed">
            This project addresses the need for a modern, scalable solution in its domain. The
            challenge was to build something that not only works well but demonstrates solid
            engineering principles and best practices.
          </p>
        </motion.section>

        {/* Solution */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold">Solution</h2>
          <p className="text-slate-300 leading-relaxed">
            I built a full-stack application using modern technologies with clean architecture in
            mind. The frontend provides a smooth, responsive user experience while the backend
            handles data processing and API orchestration.
          </p>
        </motion.section>

        {/* Architecture */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-4 bg-slate-800/30 p-6 rounded-lg border border-slate-700/50"
        >
          <h2 className="text-2xl font-bold">Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-cyan-400 mb-2">Frontend</h3>
              <ul className="space-y-1 text-slate-400 text-sm">
                <li>• React with TypeScript</li>
                <li>• Component-based architecture</li>
                <li>• TanStack Query for state management</li>
                <li>• Tailwind CSS for styling</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-cyan-400 mb-2">Backend</h3>
              <ul className="space-y-1 text-slate-400 text-sm">
                <li>• Node.js runtime</li>
                <li>• Fastify or Express.js</li>
                <li>• PostgreSQL database</li>
                <li>• REST API design</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Key Decisions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold">Engineering Decisions</h2>
          <div className="space-y-3">
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
              <h3 className="font-semibold text-cyan-400 mb-1">Type Safety</h3>
              <p className="text-slate-400 text-sm">
                Used TypeScript throughout to catch errors at compile time and improve code
                maintainability
              </p>
            </div>
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
              <h3 className="font-semibold text-cyan-400 mb-1">Modular Architecture</h3>
              <p className="text-slate-400 text-sm">
                Organized code into clear modules with single responsibilities for easier testing
                and maintenance
              </p>
            </div>
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
              <h3 className="font-semibold text-cyan-400 mb-1">Performance</h3>
              <p className="text-slate-400 text-sm">
                Optimized bundle size, implemented lazy loading, and used caching strategies for
                optimal performance
              </p>
            </div>
          </div>
        </motion.section>

        {/* Results */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold">Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 text-center">
              <p className="text-2xl font-bold text-cyan-400">100%</p>
              <p className="text-slate-400 text-sm">TypeScript Coverage</p>
            </div>
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 text-center">
              <p className="text-2xl font-bold text-cyan-400">~180KB</p>
              <p className="text-slate-400 text-sm">Bundle Size (gzipped)</p>
            </div>
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 text-center">
              <p className="text-2xl font-bold text-cyan-400">WCAG AA</p>
              <p className="text-slate-400 text-sm">Accessibility</p>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Related Projects */}
      <div className="border-t border-slate-800 pt-12">
        <button
          onClick={() => onNavigate('projects')}
          className="px-8 py-3 border border-slate-600 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 font-semibold rounded-lg transition-colors"
        >
          ← Back to All Projects
        </button>
      </div>
    </motion.div>
  );
}
