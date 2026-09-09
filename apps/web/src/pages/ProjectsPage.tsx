import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { apiClient } from '../lib/api';

interface ProjectsPageProps {
  onNavigate: (page: string, projectSlug?: string) => void;
}

export default function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => apiClient.getProjects(),
  });

  const categories = Array.from(new Set(projects.map((p) => p.category)));
  const filteredProjects = selectedCategory
    ? projects.filter((p) => p.category === selectedCategory)
    : projects;

  return (
    <div className="max-w-6xl mx-auto py-12 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-5xl font-bold">Projects</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          A selection of projects demonstrating my approach to software engineering
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-cyan-500 text-slate-950'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="text-center text-slate-400">Loading projects...</div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group p-6 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-cyan-400/50 hover:bg-slate-800/80 transition-all cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onNavigate('project-detail', project.slug)}
              whileHover={{ y: -4 }}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-cyan-400 group-hover:text-cyan-300">
                    {project.name}
                  </h3>
                  <span className="text-sm text-slate-500">{project.year}</span>
                </div>
                <p className="text-slate-400">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-slate-500 pt-4 group-hover:text-cyan-400 transition-colors">
                  Read Case Study →
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {filteredProjects.length === 0 && !isLoading && (
        <div className="text-center text-slate-400 py-12">
          No projects found in this category.
        </div>
      )}
    </div>
  );
}
