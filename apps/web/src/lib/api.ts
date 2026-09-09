const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface Project {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: string;
  featured: boolean;
  year: number;
  githubUrl?: string;
  liveUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  description?: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  createdAt: string;
  updatedAt: string;
}

export const apiClient = {
  async getProjects(featured?: boolean): Promise<Project[]> {
    const url = new URL(`${API_URL}/api/projects`);
    if (featured !== undefined) {
      url.searchParams.append('featured', featured.toString());
    }
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  },

  async getProject(slug: string): Promise<Project> {
    const res = await fetch(`${API_URL}/api/projects/${slug}`);
    if (!res.ok) throw new Error('Failed to fetch project');
    return res.json();
  },

  async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const res = await fetch(`${API_URL}/api/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    if (!res.ok) throw new Error('Failed to create project');
    return res.json();
  },

  async updateProject(slug: string, updates: Partial<Project>): Promise<Project> {
    const res = await fetch(`${API_URL}/api/projects/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update project');
    return res.json();
  },

  async deleteProject(slug: string): Promise<void> {
    const res = await fetch(`${API_URL}/api/projects/${slug}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete project');
  },

  async getSkills(category?: string): Promise<Skill[]> {
    const url = new URL(`${API_URL}/api/skills`);
    if (category) {
      url.searchParams.append('category', category);
    }
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Failed to fetch skills');
    return res.json();
  },

  async getHealth() {
    const res = await fetch(`${API_URL}/api/health`);
    if (!res.ok) throw new Error('Health check failed');
    return res.json();
  },
};
