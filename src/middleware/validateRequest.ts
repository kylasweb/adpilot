import { Response, NextFunction } from 'express';
import type { AuthRequest } from '@/types/express-types';
import { AnyZodObject, ZodError } from 'zod';

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Validation failed',
            details: error.errors.map(err => ({
              path: err.path.join('.'),
              message: err.message
            }))
          }
        });
      }
      next(error);
    }
  };
};