# Getting Started

This guide will help you get the portfolio application running locally.

## Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** 18+ ([download](https://nodejs.org/))
- **pnpm** 8+ (`npm install -g pnpm`)
- **PostgreSQL** 14+ ([download](https://www.postgresql.org/download/)) OR Docker
- **Git** ([download](https://git-scm.com/))

### Quick Check
```bash
node --version        # Should be v18.0.0 or higher
pnpm --version        # Should be 8.0.0 or higher
psql --version        # Should be 14.0 or higher (if using local PostgreSQL)
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. Install Dependencies

```bash
pnpm install
```

This installs all dependencies for the monorepo including frontend, backend, and shared packages.

## Configuration

### 1. Setup Environment Variables

Copy the example environment file and update it with your configuration:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your settings:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"

# API
API_PORT=3001
API_HOST="http://localhost:3001"
NODE_ENV="development"

# Frontend
VITE_API_URL="http://localhost:3001"
```

## Database Setup

### Option A: Using Docker (Recommended)

If you don't have PostgreSQL installed locally, Docker makes it easy:

```bash
# Start PostgreSQL in Docker
docker run --name portfolio_db \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=portfolio \
  -p 5432:5432 \
  -d postgres:16-alpine
```

Or use Docker Compose for everything:

```bash
docker compose up postgres -d
```

### Option B: Local PostgreSQL

Ensure PostgreSQL is running locally, then run migrations:

```bash
pnpm -F api run prisma:migrate
```

### 2. Initialize Database

Create tables and seed data:

```bash
# Run database migrations
pnpm -F api run prisma:migrate

# Seed initial data (projects, skills)
pnpm -F api run prisma:seed
```

## Development

### Start Everything

Start both frontend and backend in development mode:

```bash
pnpm dev
```

This runs:
- **Frontend**: http://localhost:5173 (React dev server with hot reload)
- **Backend**: http://localhost:3001 (Fastify API server)
- **API Docs**: http://localhost:3001/docs (Swagger/OpenAPI)

### Start Individual Services

If you prefer to run services separately in different terminals:

```bash
# Terminal 1: Frontend
pnpm -F web dev

# Terminal 2: Backend
pnpm -F api dev
```

## Using Docker Compose

For a complete development environment with PostgreSQL:

```bash
# Build and start all services
docker compose up --build

# Stop services
docker compose down

# Stop and remove volumes
docker compose down -v
```

Services will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- API Docs: http://localhost:3001/docs
- PostgreSQL: localhost:5432

## Quality Checks

Before committing code, run these checks:

### Type Checking
```bash
pnpm type-check
```

Verifies TypeScript types are correct across the project.

### Linting
```bash
pnpm lint
```

Checks code style and catches potential errors using ESLint.

### Testing
```bash
pnpm test
```

Runs all tests in the monorepo.

```bash
pnpm test:coverage
```

Generates coverage reports.

### Formatting
```bash
pnpm format
```

Automatically formats all code with Prettier.

### Full Quality Check
```bash
pnpm type-check && pnpm lint && pnpm test && pnpm build
```

This is what CI/CD runs before deployment.

## Building for Production

### Build All Packages

```bash
pnpm build
```

This creates:
- `apps/web/dist` - Optimized React application
- `apps/api/dist` - Compiled TypeScript backend

### Build Docker Images

```bash
# Frontend
docker build -f apps/web/Dockerfile.prod -t portfolio-web .

# Backend
docker build -f apps/api/Dockerfile.prod -t portfolio-api .

# Or use docker-compose
docker compose -f docker-compose.prod.yml up
```

## Common Tasks

### Add a New Dependency

```bash
# Add to frontend
pnpm -F web add <package-name>

# Add to backend
pnpm -F api add <package-name>

# Add dev dependency
pnpm -F web add -D <package-name>

# Add to shared package
pnpm -F "@portfolio/shared" add <package-name>
```

### Update a Project

```bash
# Create a new project via API
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "my-project",
    "name": "My Project",
    "description": "A great project",
    "technologies": ["React", "Node.js"],
    "category": "Web Development",
    "featured": true,
    "year": 2024
  }'
```

### View Database

```bash
# Connect to PostgreSQL
psql postgresql://user:password@localhost:5432/portfolio

# List tables
\dt

# Query projects
SELECT * FROM "Project";

# Exit
\q
```

### Database Migrations

```bash
# Create a new migration
pnpm -F api run prisma:migrate -- --name add_new_field

# Push schema changes (no migration file)
pnpm -F api run prisma:push

# View migration status
pnpm -F api run prisma:status

# Reset database (⚠️ deletes all data)
pnpm -F api run prisma:reset
```

## Troubleshooting

### Port Already in Use

If port 3001 or 5173 is already in use:

```bash
# Find process using port 3001
lsof -i :3001

# Kill the process
kill -9 <PID>
```

### Database Connection Error

Check that PostgreSQL is running and credentials are correct:

```bash
# Test connection
psql postgresql://user:password@localhost:5432/portfolio

# Check environment variable
echo $DATABASE_URL
```

### Module Not Found

Clear node_modules and reinstall:

```bash
rm -rf node_modules
pnpm install
```

### TypeScript Errors

Make sure types are installed:

```bash
pnpm -F api run type-check
pnpm -F web run type-check
```

## IDE Setup

### VS Code

Install recommended extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin
- REST Client

Create `.vscode/settings.json`:
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Next Steps

1. **Customize Profile**: Edit `apps/web/src/config/profile.ts`
2. **Add Projects**: Create via `/admin` page or API
3. **Update Content**: Edit about page, stack details
4. **Deploy**: Follow deployment guide (see README.md)
5. **Monitor**: Set up error tracking and analytics

## Resources

- [React Documentation](https://react.dev)
- [Fastify Documentation](https://www.fastify.io)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Docker Documentation](https://docs.docker.com)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

## Getting Help

If you encounter issues:

1. Check the [ARCHITECTURE.md](./ARCHITECTURE.md) for design details
2. Review error logs in terminal output
3. Check database with `psql` command
4. Verify environment variables are set correctly
5. Try clearing cache and reinstalling dependencies

## Support

For questions or issues:
- Check existing GitHub issues
- Open a new issue with details
- Check troubleshooting section above

Happy coding! 🚀
