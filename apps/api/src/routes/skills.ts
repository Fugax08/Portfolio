import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../index.js';

const SkillSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().optional(),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).default('intermediate'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

type Skill = z.infer<typeof SkillSchema>;

export async function skillRoutes(fastify: FastifyInstance) {
  // GET all skills
  fastify.get<{ Querystring: { category?: string } }>(
    '/api/skills',
    {
      schema: {
        description: 'Get all skills',
        tags: ['skills'],
        querystring: {
          type: 'object',
          properties: {
            category: { type: 'string', description: 'Filter by category' },
          },
        },
        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                category: { type: 'string' },
                description: { type: 'string' },
                level: { type: 'string', enum: ['beginner', 'intermediate', 'advanced', 'expert'] },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { category } = request.query;

      const where: any = {};
      if (category) {
        where.category = category;
      }

      const skills = await prisma.skill.findMany({
        where,
        orderBy: { category: 'asc' },
      });

      return reply.status(200).send(skills);
    }
  );

  // POST create skill
  fastify.post<{ Body: Skill }>(
    '/api/skills',
    {
      schema: {
        description: 'Create a new skill',
        tags: ['skills'],
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            category: { type: 'string' },
            description: { type: 'string' },
            level: { type: 'string', enum: ['beginner', 'intermediate', 'advanced', 'expert'] },
          },
          required: ['name', 'category'],
        },
        response: {
          201: {
            type: 'object',
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const data = SkillSchema.parse(request.body);

        const skill = await prisma.skill.create({
          data,
        });

        return reply.status(201).send(skill);
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

  // PUT update skill
  fastify.put<{ Params: { id: string }; Body: Partial<Skill> }>(
    '/api/skills/:id',
    {
      schema: {
        description: 'Update a skill',
        tags: ['skills'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
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
      const { id } = request.params;

      const skill = await prisma.skill.findUnique({
        where: { id },
      });

      if (!skill) {
        return reply.status(404).send({
          statusCode: 404,
          message: 'Skill not found',
        });
      }

      const updated = await prisma.skill.update({
        where: { id },
        data: request.body,
      });

      return reply.status(200).send(updated);
    }
  );

  // DELETE skill
  fastify.delete<{ Params: { id: string } }>(
    '/api/skills/:id',
    {
      schema: {
        description: 'Delete a skill',
        tags: ['skills'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
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
      const { id } = request.params;

      const skill = await prisma.skill.findUnique({
        where: { id },
      });

      if (!skill) {
        return reply.status(404).send({
          statusCode: 404,
          message: 'Skill not found',
        });
      }

      await prisma.skill.delete({
        where: { id },
      });

      return reply.status(204).send();
    }
  );
}
