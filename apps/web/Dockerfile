# Development Dockerfile for Web
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy monorepo files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./

# Copy web app
COPY apps/web ./apps/web

# Copy shared packages
COPY packages ./packages

# Install dependencies
RUN pnpm install

# Expose port
EXPOSE 5173

# Start the development server
CMD ["pnpm", "-F", "web", "run", "dev"]
