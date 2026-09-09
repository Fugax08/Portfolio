import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AboutPage from './pages/AboutPage';
import StackPage from './pages/StackPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

type Page = 'home' | 'projects' | 'project-detail' | 'about' | 'stack' | 'admin' | 'not-found';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

interface PageState {
  current: Page;
  projectSlug?: string;
}

export default function App() {
  const [pageState, setPageState] = React.useState<PageState>({ current: 'home' });
  const [darkMode, setDarkMode] = React.useState(true);

  useEffect(() => {
    // Apply dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navigateTo = (page: Page, projectSlug?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPageState({ current: page, projectSlug });
  };

  const renderPage = () => {
    switch (pageState.current) {
      case 'home':
        return <HomePage onNavigate={navigateTo} />;
      case 'projects':
        return <ProjectsPage onNavigate={navigateTo} />;
      case 'project-detail':
        return <ProjectDetailPage slug={pageState.projectSlug || ''} onNavigate={navigateTo} />;
      case 'about':
        return <AboutPage />;
      case 'stack':
        return <StackPage />;
      case 'admin':
        return <AdminPage />;
      case 'not-found':
        return <NotFoundPage onNavigate={navigateTo} />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <Navigation currentPage={pageState.current} onNavigate={navigateTo} />
        <main className="flex-1 px-4 sm:px-6 lg:px-8">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
