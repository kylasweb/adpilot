import { Response } from "express";
import type { AuthRequest } from '@/types/express-types';
import { prisma } from "../lib/prisma";
import { BugStatus, BugPriority } from "@prisma/client";

export const createBug = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, projectId, taskId, status, priority } = req.body;

    const bug = await prisma.bug.create({
      data: {
        title,
        description,
        projectId,
        taskId,
        status: status as BugStatus,
        priority: priority as BugPriority,
      },
    });

    res.status(201).json(bug);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const getBug = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const bug = await prisma.bug.findUnique({
      where: {
        id,
      },
    });

    if (!bug) {
      res.status(404).json({ error: "Bug not found" });
      return;
    }

    res.status(200).json(bug);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const updateBug = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;

    const bug = await prisma.bug.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        status: status as BugStatus,
        priority: priority as BugPriority,
      },
    });

    res.status(200).json(bug);
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const deleteBug = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.bug.delete({
      where: {
        id,
      },
    });

    res.status(204).send();
  } catch (error: unknown) {
    console.error(error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};
