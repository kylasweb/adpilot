import express from "express";
import {
  createRoadmap,
  getRoadmap,
  updateRoadmap,
  deleteRoadmap,
} from "../controllers/roadmaps";
import { validateRequest } from "../middleware/validateRequest";
import { roadmapSchema } from "../schemas/roadmap";
import { Request, Response, NextFunction, RequestHandler } from "express";

const router = express.Router();

// Helper to wrap middleware to ensure it conforms to RequestHandler's Promise<void> return type expectation
const wrapMiddleware = (
  middleware: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await middleware(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

router.post(
  "/",
  wrapMiddleware(validateRequest(roadmapSchema)),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await createRoadmap(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await getRoadmap(req, res);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await updateRoadmap(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await deleteRoadmap(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;