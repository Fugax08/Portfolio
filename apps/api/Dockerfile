# Development Dockerfile for API
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy monorepo files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./

# Copy prisma schema
COPY prisma ./prisma

# Copy api app
COPY apps/api ./apps/api

# Copy shared packages
COPY packages ./packages

# Install dependencies
RUN pnpm install

# Build the API
RUN pnpm -F api run build

# Expose port
EXPOSE 3001

# Start the server
CMD ["pnpm", "-F", "api", "run", "start"]
