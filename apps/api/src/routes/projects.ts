import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { prisma } from '../index.js';

const ProjectSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  longDescription: z.string().optional(),
  technologies: z.array(z.string()),
  category: z.string(),
  featured: z.boolean().default(false),
  year: z.number().int(),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

type Project = z.infer<typeof ProjectSchema>;

export async function projectRoutes(fastify: FastifyInstance) {
  // GET all projects
  fastify.get<{ Querystring: { featured?: string } }>(
    '/api/projects',
    {
      schema: {
        description: 'Get all portfolio projects',
        tags: ['projects'],
        querystring: {
          type: 'object',
          properties: {
            featured: { type: 'string', description: 'Filter by featured status' },
          },
        },
        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                slug: { type: 'string' },
                name: { type: 'string' },
                description: { type: 'string' },
                technologies: { type: 'array', items: { type: 'string' } },
                category: { type: 'string' },
                featured: { type: 'boolean' },
                year: { type: 'number' },
                githubUrl: { type: 'string' },
                liveUrl: { type: 'string' },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { featured } = request.query;

      const where: any = {};
      if (featured !== undefined) {
        where.featured = featured === 'true';
      }

      const projects = await prisma.project.findMany({
        where,
        orderBy: { year: 'desc' },
      });

      return reply.status(200).send(projects);
    }
  );

  // GET single project
  fastify.get<{ Params: { slug: string } }>(
    '/api/projects/:slug',
    {
      schema: {
        description: 'Get a specific project by slug',
        tags: ['projects'],
        params: {
          type: 'object',
          properties: {
            slug: { type: 'string' },
          },
          required: ['slug'],
        },
        response: {
          200: {
            type: 'object',
          },
          404: {
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { slug } = request.params;

      const project = await prisma.project.findUnique({
        where: { slug },
      });

      if (!project) {
        return reply.status(404).send({
          statusCode: 404,
          message: 'Project not found',
        });
      }

      return reply.status(200).send(project);
    }
  );

  // POST create project
  fastify.post<{ Body: Project }>(
    '/api/projects',
    {
      schema: {
        description: 'Create a new project',
        tags: ['projects'],
        body: {
          type: 'object',
          properties: {
            slug: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            longDescription: { type: 'string' },
            technologies: { type: 'array', items: { type: 'string' } },
            category: { type: 'string' },
            featured: { type: 'boolean' },
            year: { type: 'number' },
            githubUrl: { type: 'string' },
            liveUrl: { type: 'string' },
          },
          required: ['slug', 'name', 'description', 'technologies', 'category', 'year'],
        },
        response: {
          201: {
            type: 'object',
          },
          400: {
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const data = ProjectSchema.parse(request.body);

        const project = await prisma.project.create({
          data: {
            slug: data.slug,
            name: data.name,
            description: data.description,
            longDescription: data.longDescription,
            technologies: data.technologies,
            category: data.category,
            featured: data.featured,
            year: data.year,
            githubUrl: data.githubUrl,
            liveUrl: data.liveUrl,
          },
        });

        return reply.status(201).send(project);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            statusCode: 400,
            message: 'Validation error',
            errors: error.errors,
          });
        }
        throw error;
      }
    }
  );

  // PUT update project
  fastify.put<{ Params: { slug: string }; Body: Partial<Project> }>(
    '/api/projects/:slug',
    {
      schema: {
        description: 'Update a project',
        tags: ['projects'],
        params: {
          type: 'object',
          properties: {
            slug: { type: 'string' },
          },
          required: ['slug'],
        },
        body: {
          type: 'object',
        },
        response: {
          200: {
            type: 'object',
          },
          404: {
            type: 'object',
          },
        },
      },
    },
    async (request, reply) => {
      const { slug } = request.params;

      const project = await prisma.project.findUnique({
        where: { slug },
      });

      if (!project) {
        return reply.status(404).send({
          statusCode: 404,
          message: 'Project not found',
        });
      }

      const updated = await prisma.project.update({
        where: { slug },
        data: request.body,
      });

      return reply.status(200).send(updated);
    }
  );

  // DELETE project
  fastify.delete<{ Params: { slug: string } }>(
    '/api/projects/:slug',
    {
      schema: {
        description: 'Delete a project',
        tags: ['projects'],
        params: {
          type: 'object',
          properties: {
            slug: { type: 'string' },
          },
          required: ['slug'],
        },
        response: {
          204: {
            type: 'null',
          },
          404: {
            type: 'object',
          },
        },
      },
    },
    async (request, reply) => {
      const { slug } = request.params;

      const project = await prisma.project.findUnique({
        where: { slug },
      });

      if (!project) {
        return reply.status(404).send({
          statusCode: 404,
          message: 'Project not found',
        });
      }

      await prisma.project.delete({
        where: { slug },
      });

      return reply.status(204).send();
    }
  );
}
