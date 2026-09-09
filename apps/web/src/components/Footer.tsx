import { profile } from '../config/profile';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-800/50 bg-slate-900/50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-cyan-400 mb-2">Luca Di Francesco</h3>
            <p className="text-slate-400 text-sm">{profile.role}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-200 mb-4">Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-semibold text-slate-200 mb-4">Built With</h4>
            <ul className="space-y-1 text-sm text-slate-400">
              <li>React + TypeScript</li>
              <li>Node.js + Fastify</li>
              <li>PostgreSQL + Prisma</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800/50 pt-8 mt-8">
          <p className="text-center text-slate-500 text-sm">
            © {currentYear} Luca Di Francesco. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
