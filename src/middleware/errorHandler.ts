import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ApiError } from '../utils/ApiError';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

interface PrismaError extends Error {
  code: string;
  meta?: {
    target?: string[];
    [key: string]: unknown;
  };
}

export const errorHandler: ErrorRequestHandler = (
  error: Error | ApiError | PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error
  console.error(error);

  // Handle ApiError instances
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
        details: error.details
      }
    });
    return;
  }

  // Handle Prisma errors
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002': // Unique constraint violation
        res.status(409).json({
          error: {
            code: 'CONFLICT',
            message: 'Resource already exists',
            details: error.meta
          }
        });
        return;
      case 'P2025': // Record not found
        res.status(404).json({
          error: {
            code: 'NOT_FOUND',
            message: 'Resource not found',
            details: error.meta
          }
        });
        return;
      default:
        res.status(400).json({
          error: {
            code: 'DATABASE_ERROR',
            message: 'Database operation failed',
            details: error.meta
          }
        });
        return;
    }
  }

  // Handle validation errors
  if (error.name === 'ValidationError') {
    res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: error.message
      }
    });
    return;
  }

  // Handle unknown errors
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Internal server error'
    }
  });
};