# Luca Di Francesco — Software Engineer Portfolio

A modern, full-stack portfolio website built with React, TypeScript, Node.js, and PostgreSQL. Demonstrates contemporary software engineering practices including clean architecture, type safety, testing, and performance optimization.

## 🌐 Overview

This is not a template—it's a real, production-ready application that showcases how I design and build modern web applications. Every decision, from architecture to dependencies, reflects intentional engineering choices.

**What this project demonstrates:**
- Full-stack TypeScript development (frontend & backend)
- Modern React patterns with hooks and composition
- REST API design and documentation (OpenAPI/Swagger)
- Database design with Prisma ORM
- Monorepo structure with pnpm workspaces
- Comprehensive testing strategy
- CI/CD with GitHub Actions
- Docker containerization
- Clean, maintainable code

## ✨ Features

- **Responsive Design**: Perfectly optimized for desktop, tablet, and mobile
- **Dark Mode**: Modern dark-first interface with smooth animations
- **Project Showcase**: Detailed case studies with architecture diagrams
- **Live API**: Backend serves all portfolio data via REST API
- **Admin Dashboard**: Manage portfolio content (basic demo)
- **Type Safety**: 100% TypeScript throughout
- **Testing**: Unit and integration tests for critical paths
- **Performance**: Optimized bundle size, lazy loading, caching
- **Accessibility**: WCAG compliance with semantic HTML and ARIA labels
- **SEO**: Meta tags, Open Graph, sitemap, robots.txt

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool (blazing fast)
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Smooth animations
- **React Router** - Routing
- **TanStack Query** - Server state management
- **Zod** - Type-safe validation

### Backend
- **Node.js** - Runtime
- **TypeScript** - Type safety
- **Fastify** - High-performance web framework
- **Fastify-cors** - CORS handling
- **Fastify-swagger** - OpenAPI/Swagger integration
- **Zod** - Input validation

### Database & ORM
- **PostgreSQL** - Relational database
- **Prisma** - Modern ORM

### Testing
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing
- **Supertest** - HTTP assertion library

### DevOps & Tools
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **pnpm** - Fast, reliable package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **GitHub Actions** - CI/CD

## 📦 Project Structure

```
.
├── apps/
│   ├── web/                 # React frontend
│   │   ├── src/
│   │   │   ├── pages/       # Route pages
│   │   │   ├── components/  # Reusable components
│   │   │   ├── hooks/       # Custom React hooks
│   │   │   ├── config/      # Configuration
│   │   │   └── styles/      # Global styles
│   │   ├── vite.config.ts   # Vite configuration
│   │   └── package.json
│   └── api/                 # Fastify backend
│       ├── src/
│       │   ├── routes/      # API endpoints
│       │   ├── handlers/    # Request handlers
│       │   ├── middleware/  # Middleware
│       │   └── utils/       # Utilities
│       └── package.json
├── packages/
│   └── shared/              # Shared TypeScript types
│       └── src/
│           └── types.ts     # Shared type definitions
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Database seeding
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions CI pipeline
├── docker-compose.yml       # Local development setup
├── pnpm-workspace.yaml      # Monorepo configuration
├── tsconfig.json            # Root TypeScript config
├── .eslintrc.json          # Linting rules
├── .prettierrc              # Formatting rules
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **pnpm** ≥ 8
- **Docker & Docker Compose** (optional, for containerized development)
- **PostgreSQL** (or use Docker)

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
pnpm install
```

### 2. Setup Environment

```bash
# Copy environment template
cp .env.example .env.local

# Update .env.local with your configuration
```

### 3. Database Setup

#### Option A: Using Docker Compose (Recommended)

```bash
# Start PostgreSQL container
docker compose up postgres -d

# Run migrations
pnpm -F api run prisma:migrate

# Seed initial data
pnpm -F api run prisma:seed
```

#### Option B: Local PostgreSQL

Ensure PostgreSQL is running locally, then:

```bash
# Run migrations
pnpm -F api run prisma:migrate

# Seed initial data
pnpm -F api run prisma:seed
```

### 4. Development

```bash
# Start both frontend and backend
pnpm dev

# Or start individually:
pnpm -F web dev        # Frontend only (http://localhost:5173)
pnpm -F api dev        # Backend only (http://localhost:3001)
```

### 5. View API Documentation

API documentation is available at: `http://localhost:3001/docs`

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Watch mode
pnpm test:watch

# Frontend tests only
pnpm -F web test

# Backend tests only
pnpm -F api test
```

## 🐳 Docker

### Start Everything

```bash
# Build and start all services
docker compose up --build

# Access:
# - Frontend: http://localhost:5173
# - Backend: http://localhost:3001
# - API Docs: http://localhost:3001/docs
# - Database: postgres://user:password@localhost:5432/portfolio
```

### Stop Services

```bash
docker compose down
```

## 📤 Deployment

### Prepare for Production

```bash
# Type check
pnpm type-check

# Lint
pnpm lint

# Test
pnpm test

# Build
pnpm build
```

## 🔌 API Endpoints

Base URL: `http://localhost:3001`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/projects` | List all projects |
| GET | `/api/projects/:slug` | Get project details |
| GET | `/api/skills` | List all skills |
| POST | `/api/projects` | Create project (admin) |
| PUT | `/api/projects/:slug` | Update project (admin) |
| DELETE | `/api/projects/:slug` | Delete project (admin) |

Full documentation: `http://localhost:3001/docs` (Swagger UI)

## 🏗️ Architecture

### Frontend Architecture
- **Component-based** design with TypeScript
- **Custom hooks** for logic extraction
- **TanStack Query** for server state management
- **React Router** for SPA routing
- **Lazy loading** for code splitting and performance

### Backend Architecture
- **RESTful API** with clear separation of concerns
- **Type-safe** routes and handlers with Zod validation
- **Middleware-based** architecture (CORS, error handling, logging)
- **Prisma ORM** for type-safe database queries
- **Swagger/OpenAPI** for API documentation

## 📋 Environment Variables

See `.env.example` for all available variables:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio

# API
API_PORT=3001
API_HOST=http://localhost:3001
NODE_ENV=development

# Frontend
VITE_API_URL=http://localhost:3001
```

## 🔧 Engineering Decisions

### Why Fastify Over Express?
- Faster performance and lower memory footprint
- Better TypeScript support out of the box
- Modern async/await API design
- Excellent plugin ecosystem

### Why pnpm Over npm/yarn?
- Faster installation and better disk space efficiency
- Monorepo support with workspaces
- Stricter dependency resolution

### Why Prisma?
- Type-safe database access
- Automatic migrations
- Excellent developer experience
- Database-agnostic schema

### Why Vite?
- Significantly faster build times (HMR in milliseconds)
- Modern ES module support
- Smaller production bundles
- Better plugin ecosystem

## 📊 Performance

- **Frontend Bundle**: ~180KB gzipped
- **Lazy-loaded routes** reduce initial load
- **Optimized images** with WebP fallbacks
- **API response caching** with TanStack Query
- **CSS code splitting** with Tailwind

## ♿ Accessibility

- WCAG 2.1 Level AA compliant
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Sufficient color contrast (WCAG AA)
- Respects `prefers-reduced-motion`

## 🔐 Security

- CORS properly configured
- Environment variables for sensitive data
- Input validation with Zod
- No hardcoded secrets
- Security headers (via Helmet in production)

## 📝 License

MIT License - See [LICENSE](./LICENSE) for details.

---

**Built with care by Luca Di Francesco** — demonstrating thoughtful software engineering from architecture to implementation.