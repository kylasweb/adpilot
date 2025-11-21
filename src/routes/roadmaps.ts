import express from "express";
import {
  createRoadmap,
  getRoadmap,
  updateRoadmap,
  deleteRoadmap,
} from "../controllers/roadmaps";
import { validateRequest } from "../middleware/validateRequest";
import { roadmapSchema } from "../schemas/roadmap";
import { Response, NextFunction, RequestHandler } from "express";
import type { AuthRequest } from '@/types/express-types';

const router = express.Router();

// Helper to wrap middleware to ensure it conforms to RequestHandler's Promise<void> return type expectation
const wrapMiddleware = (
  middleware: (req: AuthRequest, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return async (req: import('express').Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Express will provide a plain Request at runtime; cast to AuthRequest for middleware
      await middleware(req as AuthRequest, res, next);
    } catch (error) {
      next(error);
    }
  };
};

router.post(
  "/",
  wrapMiddleware(validateRequest(roadmapSchema)),
  async (req: import('express').Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await createRoadmap(req as AuthRequest, res);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id", async (req: import('express').Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await getRoadmap(req as AuthRequest, res);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req: import('express').Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await updateRoadmap(req as AuthRequest, res);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req: import('express').Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await deleteRoadmap(req as AuthRequest, res);
  } catch (error) {
    next(error);
  }
});

export default router;