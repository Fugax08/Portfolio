import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { profile } from '../config/profile';
import { apiClient } from '../lib/api';

export default function StackPage() {
  const { data: skills = [] } = useQuery({
    queryKey: ['skills'],
    queryFn: () => apiClient.getSkills(),
  });

  const categories = Array.from(new Set(skills.map((s) => s.category)));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert':
        return 'border-cyan-500 bg-cyan-500/10';
      case 'advanced':
        return 'border-blue-500 bg-blue-500/10';
      case 'intermediate':
        return 'border-slate-500 bg-slate-500/10';
      case 'beginner':
        return 'border-slate-600 bg-slate-600/10';
      default:
        return 'border-slate-500 bg-slate-500/10';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto py-12 space-y-12"
    >
      {/* Header */}
      <div className="space-y-6">
        <h1 className="text-5xl font-bold">Tech Stack</h1>
        <p className="text-xl text-slate-400 max-w-2xl">
          The technologies and tools I use to build modern applications
        </p>
      </div>

      {/* Skills by Category */}
      <div className="space-y-12">
        {categories.map((category) => {
          const categorySkills = skills.filter((s) => s.category === category);

          return (
            <motion.section
              key={category}
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-cyan-400">{category}</h2>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                variants={containerVariants}
              >
                {categorySkills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    className={`p-6 rounded-lg border transition-all hover:shadow-lg hover:scale-105 ${getLevelColor(skill.level)}`}
                    variants={itemVariants}
                  >
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">{skill.name}</h3>
                    {skill.description && (
                      <p className="text-slate-400 text-sm mb-3">{skill.description}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-400 uppercase">
                        {skill.level}
                      </span>
                      <div className="w-20 h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            skill.level === 'expert'
                              ? 'w-full bg-cyan-500'
                              : skill.level === 'advanced'
                                ? 'w-4/5 bg-blue-500'
                                : skill.level === 'intermediate'
                                  ? 'w-3/5 bg-slate-500'
                                  : 'w-2/5 bg-slate-600'
                          }`}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          );
        })}
      </div>

      {/* Summary */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="border-t border-slate-800 pt-12"
      >
        <h2 className="text-3xl font-bold mb-6">Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
            <h3 className="font-bold text-cyan-400 mb-4">Frontend Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {profile.technologies.frontend.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
            <h3 className="font-bold text-cyan-400 mb-4">Backend Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {profile.technologies.backend.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
            <h3 className="font-bold text-cyan-400 mb-4">DevOps & Tools</h3>
            <div className="flex flex-wrap gap-2">
              {profile.technologies.tools.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
            <h3 className="font-bold text-cyan-400 mb-4">Other Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {profile.technologies.other.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
