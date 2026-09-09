import React from 'react';
import { motion } from 'framer-motion';

interface NotFoundPageProps {
  onNavigate: (page: string) => void;
}

export default function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto py-20 text-center space-y-8"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-8xl font-bold text-cyan-400 mb-4">404</h1>
        <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-xl text-slate-400 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <button
          onClick={() => onNavigate('home')}
          className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold rounded-lg transition-colors"
        >
          Go Home
        </button>
        <button
          onClick={() => onNavigate('projects')}
          className="px-8 py-3 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-950 font-semibold rounded-lg transition-colors"
        >
          View Projects
        </button>
      </motion.div>
    </motion.div>
  );
}
