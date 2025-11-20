import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const createRoadmap = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getRoadmap = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
    return;
  }
};

export const updateRoadmap = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

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
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteRoadmap = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.roadmap.delete({
      where: {
        id,
      },
    });

    res.status(204).send();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};