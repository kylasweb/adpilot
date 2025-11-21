import { Response } from "express";
import type { AuthRequest } from '@/types/express-types';

type RoadmapParams = { id: string };

type CreateRoadmapBody = {
  name: string;
  description?: string | null;
  projectId: string;
};

type UpdateRoadmapBody = Partial<{
  name: string;
  description: string | null;
}>;
import { prisma } from "../lib/prisma";

export const createRoadmap = async (req: AuthRequest<Record<string, never>, any, CreateRoadmapBody>, res: Response) => {
  try {
    const { name, description, projectId } = req.body;

    const roadmap = await prisma.roadmap.create({
      data: {
        name,
        description,
        projectId,
      },
    });

    res.status(201).json(roadmap);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
};

export const getRoadmap = async (req: AuthRequest<RoadmapParams, any, undefined>, res: Response) => {
  try {
    const { id } = req.params;

    const roadmap = await prisma.roadmap.findUnique({
      where: {
        id,
      },
    });

    if (!roadmap) {
      res.status(404).json({ error: "Roadmap not found" });
      return;
    }

    res.status(200).json(roadmap);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    return;
  }
};

export const updateRoadmap = async (req: AuthRequest<RoadmapParams, any, UpdateRoadmapBody>, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body || {};

    const roadmap = await prisma.roadmap.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });

    res.status(200).json(roadmap);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
};

export const deleteRoadmap = async (req: AuthRequest<RoadmapParams, any, undefined>, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.roadmap.delete({
      where: {
        id,
      },
    });

    res.status(204).send();
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
};