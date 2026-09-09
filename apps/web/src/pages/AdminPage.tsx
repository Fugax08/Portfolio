import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { apiClient } from '../lib/api';

export default function AdminPage() {
  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => apiClient.getProjects(),
  });

  const { data: skills = [], isLoading: skillsLoading } = useQuery({
    queryKey: ['skills'],
    queryFn: () => apiClient.getSkills(),
  });

  const { data: health } = useQuery({
    queryKey: ['health'],
    queryFn: () => apiClient.getHealth(),
    refetchInterval: 5000,
  });

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    technologies: '',
    category: 'Web Development',
    year: new Date().getFullYear(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const slug = formData.name.toLowerCase().replace(/\s+/g, '-');
      await apiClient.createProject({
        slug,
        name: formData.name,
        description: formData.description,
        technologies: formData.technologies.split(',').map((t) => t.trim()),
        category: formData.category,
        featured: false,
        year: formData.year,
      });
      setFormData({ name: '', description: '', technologies: '', category: 'Web Development', year: new Date().getFullYear() });
      setShowForm(false);
      // Refetch projects
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto py-12 space-y-12"
    >
      <div className="space-y-4">
        <h1 className="text-5xl font-bold">Admin Dashboard</h1>
        <p className="text-slate-400">Manage your portfolio content</p>
      </div>

      {/* Status Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-lg">
          <p className="text-slate-400 text-sm mb-2">Total Projects</p>
          <p className="text-3xl font-bold text-cyan-400">{projects.length}</p>
        </div>
        <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-lg">
          <p className="text-slate-400 text-sm mb-2">Total Skills</p>
          <p className="text-3xl font-bold text-cyan-400">{skills.length}</p>
        </div>
        <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-lg">
          <p className="text-slate-400 text-sm mb-2">API Status</p>
          <p className={`text-lg font-bold ${health?.status === 'ok' ? 'text-green-400' : 'text-red-400'}`}>
            {health?.status === 'ok' ? '✓ Online' : '✗ Offline'}
          </p>
        </div>
        <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-lg">
          <p className="text-slate-400 text-sm mb-2">Database</p>
          <p className={`text-lg font-bold ${health?.database === 'connected' ? 'text-green-400' : 'text-red-400'}`}>
            {health?.database === 'connected' ? '✓ Connected' : '✗ Disconnected'}
          </p>
        </div>
      </motion.div>

      {/* Projects Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Projects</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold rounded-lg transition-colors"
          >
            {showForm ? 'Cancel' : 'Add Project'}
          </button>
        </div>

        {/* Add Project Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-lg space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400 h-20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400"
                placeholder="React, Node.js, TypeScript"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400"
                >
                  <option>Web Development</option>
                  <option>Game Development</option>
                  <option>Tools & Utilities</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Year</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold rounded-lg transition-colors"
            >
              Create Project
            </button>
          </form>
        )}

        {/* Projects Table */}
        {projectsLoading ? (
          <div className="text-center text-slate-400">Loading projects...</div>
        ) : (
          <div className="overflow-x-auto border border-slate-700/50 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-slate-800/50 border-b border-slate-700/50">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-slate-300">Name</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-300">Category</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-300">Year</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-300">Tech</th>
                  <th className="px-6 py-3 text-left font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-slate-700/50 hover:bg-slate-800/30">
                    <td className="px-6 py-3 text-slate-200">{project.name}</td>
                    <td className="px-6 py-3 text-slate-400">{project.category}</td>
                    <td className="px-6 py-3 text-slate-400">{project.year}</td>
                    <td className="px-6 py-3 text-slate-400 text-xs">
                      {project.technologies.slice(0, 2).join(', ')}
                      {project.technologies.length > 2 && ` +${project.technologies.length - 2}`}
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => apiClient.deleteProject(project.slug)}
                        className="text-red-400 hover:text-red-300 text-xs font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.section>
    </motion.div>
  );
}
