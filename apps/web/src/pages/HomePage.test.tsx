import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './HomePage';

const mockNavigate = vi.fn();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

describe('HomePage', () => {
  it('should render the hero section', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HomePage onNavigate={mockNavigate} />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Luca Di Francesco/i)).toBeInTheDocument();
    expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
  });

  it('should render call-to-action buttons', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HomePage onNavigate={mockNavigate} />
      </QueryClientProvider>
    );

    expect(screen.getByText(/View My Work/i)).toBeInTheDocument();
    expect(screen.getByText(/GitHub/i)).toBeInTheDocument();
    expect(screen.getByText(/LinkedIn/i)).toBeInTheDocument();
  });

  it('should render tech stack section', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HomePage onNavigate={mockNavigate} />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Tech Stack/i)).toBeInTheDocument();
    expect(screen.getByText(/React/i)).toBeInTheDocument();
    expect(screen.getByText(/TypeScript/i)).toBeInTheDocument();
  });
});
