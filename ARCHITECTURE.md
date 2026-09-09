# Architecture

This document outlines the architecture and key design decisions behind the portfolio application.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          Frontend (React)                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Pages: Home, Projects, About, Stack, Admin, NotFound    │  │
│  │ Components: Navigation, Footer, Project Card, etc.      │  │
│  │ State: TanStack Query (Server State), React Hooks       │  │
│  │ Styling: Tailwind CSS + Framer Motion                   │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                                ↓
                    HTTP/REST API Communication
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Backend API (Fastify)                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Routes:                                                   │  │
│  │  - GET  /api/health          (health check)              │  │
│  │  - GET  /api/projects        (list projects)             │  │
│  │  - GET  /api/projects/:slug  (get project details)       │  │
│  │  - POST /api/projects        (create project)            │  │
│  │  - PUT  /api/projects/:slug  (update project)            │  │
│  │  - DEL  /api/projects/:slug  (delete project)            │  │
│  │  - GET  /api/skills          (list skills)               │  │
│  │  - POST /api/skills          (create skill)              │  │
│  │  - /docs                     (Swagger documentation)     │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                                ↓
                      Database Communication
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                  PostgreSQL Database                             │
│  Tables:                                                          │
│  ├── Project (id, slug, name, description, ...)                 │
│  ├── Skill (id, name, category, level, ...)                     │
│  └── Category (id, name, description, ...)                      │
└─────────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Component Structure
- **Pages**: Top-level route components
  - `HomePage`: Hero section, featured projects, tech stack
  - `ProjectsPage`: All projects with filtering
  - `ProjectDetailPage`: Case study view with architecture
  - `AboutPage`: Bio and experience
  - `StackPage`: Technology catalog
  - `AdminPage`: Dashboard for managing content
  - `NotFoundPage`: 404 handling

- **Components**: Reusable UI components
  - `Navigation`: Top navigation bar
  - `Footer`: Footer section

### State Management
- **Server State**: TanStack Query (React Query)
  - Handles API communication
  - Automatic caching and synchronization
  - Built-in loading and error states
  - Automatic refetching and stale time management

- **Client State**: React Hooks
  - Component-level state with `useState`
  - Dark mode toggle
  - Navigation state
  - Form state

### Data Flow
1. Components render and request data via TanStack Query
2. Query hook fetches from backend API
3. Data is cached and provided to components
4. User interactions trigger mutations or navigation
5. Component re-renders with updated data

## Backend Architecture

### Request/Response Flow
1. **Request** arrives at Fastify server
2. **Routing** - Request matched to handler
3. **Validation** - Zod schema validates input
4. **Handling** - Business logic executes
5. **Database** - Prisma queries execute
6. **Response** - JSON response sent to client

### Error Handling
- Centralized error handler middleware
- Consistent error response format
- HTTP status codes: 200, 201, 204, 400, 404, 500
- Validation errors include detailed field information

### Middleware Stack
1. Helmet - Security headers
2. CORS - Cross-Origin Resource Sharing
3. Swagger - API documentation
4. Custom Error Handler - Centralized error processing

## Database Schema

### Project Table
```prisma
model Project {
  id              String   @id @default(cuid())
  slug            String   @unique
  name            String
  description     String
  longDescription String?
  technologies    String[]
  category        String
  featured        Boolean  @default(false)
  year            Int
  githubUrl       String?
  liveUrl         String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### Skill Table
```prisma
model Skill {
  id          String   @id @default(cuid())
  name        String
  category    String
  description String?
  level       String   @default("intermediate")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Indexes
- `Project.featured` - Fast filtering by featured status
- `Project.year` - Sort by year
- `Project.category` - Filter by category
- `Skill.category` - Group skills by category
- `Skill.level` - Filter by expertise level

## Deployment Strategy

### Development
```bash
docker compose up --build
```

### Production
1. Build Docker images
2. Push to container registry
3. Deploy to hosting platform
4. Set environment variables
5. Run database migrations
6. Start services

### Environment-Specific Configuration
- **Development**: Hot reload, verbose logging, development database
- **Production**: Optimized bundles, minimal logging, production database

## Performance Considerations

### Frontend
- **Code Splitting**: React Router lazy loading
- **Bundle Optimization**: Tree-shaking, minification via Vite
- **Image Optimization**: WebP with fallbacks
- **Caching**: TanStack Query client-side caching
- **CSS-in-JS**: Tailwind atomic classes with PurgeCSS

### Backend
- **Database Indexing**: Indexes on frequently queried fields
- **Query Optimization**: Prisma efficient queries
- **Caching Headers**: Cache-Control headers for static assets
- **Compression**: Gzip for API responses

### Targeting Metrics
- **Initial Load**: < 3s
- **First Contentful Paint**: < 2s
- **Lighthouse Score**: > 90 (desktop)
- **Bundle Size**: Frontend < 200KB gzipped

## Security Architecture

### Frontend Security
- XSS Prevention: React auto-escapes by default
- CSRF Protection: SameSite cookies
- Content Security Policy: Via Helmet headers
- HTTPS: Enforced in production

### Backend Security
- CORS: Properly configured allowed origins
- Input Validation: Zod for runtime validation
- SQL Injection: Prisma parameterized queries
- Environment Secrets: Never hardcoded

### API Authentication
- Currently: Public read access
- Admin: Can be protected with middleware
- Recommendation: Add JWT for protected endpoints

## Scalability

### Current Design Handles
- 1000+ projects
- 500+ skills
- 1000 concurrent users

### Horizontal Scaling Strategy
1. **Database**: Connection pooling, read replicas
2. **API**: Multiple instances behind load balancer
3. **Frontend**: CDN distribution, edge caching
4. **Cache**: Redis for session/query caching

## Monitoring and Logging

### Current Implementation
- Health check endpoint (`/api/health`)
- Fastify structured logging
- Browser console logging

### Recommended Additions
- Error tracking (Sentry, Rollbar)
- APM (Application Performance Monitoring)
- Log aggregation (ELK Stack, Datadog)
- User analytics (Plausible, Fathom)

## Testing Strategy

### Unit Tests
- API routes and handlers
- Utility functions
- Component rendering

### Integration Tests
- API endpoint behavior
- Database operations
- Component interactions

### E2E Tests
- User workflows
- Full page interactions
- API and database integration

### Coverage Targets
- Backend: > 80% line coverage
- Frontend: > 60% line coverage
- Critical paths: 100% coverage

## CI/CD Pipeline

### Automated Checks
1. Type checking (TypeScript)
2. Linting (ESLint)
3. Unit tests
4. Build verification
5. Security scanning (optional)

### Deployment Gates
- All checks must pass
- Code review approval
- Test coverage maintained
- No security vulnerabilities

## Technology Rationale

### React + TypeScript
- Type safety catches errors at compile time
- Excellent ecosystem and community
- Component reusability
- Performance optimizations with Suspense

### Fastify
- Faster than Express (lower latency, higher throughput)
- Modern async/await API
- Excellent TypeScript support
- Built-in validation and serialization

### PostgreSQL + Prisma
- Relational data model fits portfolio use case
- Prisma provides type-safe queries
- Migration system for schema changes
- Excellent query optimization

### Tailwind CSS
- Utility-first approach accelerates development
- Small production bundle with PurgeCSS
- Easy dark mode implementation
- Consistent design system

## Future Improvements

1. **Caching Layer**: Redis for frequently accessed data
2. **Real-time Updates**: WebSockets for live admin dashboard
3. **Image Optimization**: Server-side image resizing
4. **Analytics**: User behavior tracking
5. **Authentication**: JWT-based admin auth
6. **Search**: Full-text search for projects
7. **Versioning**: API versioning strategy
8. **Rate Limiting**: Per-IP rate limiting
9. **Database Replication**: Master-slave setup
10. **CDN Integration**: Edge caching for frontend assets
