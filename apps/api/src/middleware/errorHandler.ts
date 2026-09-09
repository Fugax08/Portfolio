import { FastifyError, FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';

export interface ApiError extends FastifyError {
  statusCode: number;
  message: string;
  code?: string;
}

export function errorHandler(
  error: FastifyError | ApiError | ZodError | Error,
  _request: FastifyRequest,
  reply: FastifyReply
): void {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let code = 'INTERNAL_ERROR';

  if (error instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    code = 'VALIDATION_ERROR';

    reply.status(statusCode).send({
      statusCode,
      message,
      code,
      errors: error.errors,
    });
    return;
  }

  if ('statusCode' in error && typeof error.statusCode === 'number') {
    statusCode = error.statusCode;
    message = error.message;
    code = error.code || 'API_ERROR';
  } else if (error instanceof Error) {
    message = error.message;
  }

  reply.status(statusCode).send({
    statusCode,
    message,
    code,
  });
}
