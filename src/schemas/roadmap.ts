import { z } from "zod";

export const roadmapSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().optional(),
  projectId: z.string().uuid(),
});

export type RoadmapSchema = z.infer<typeof roadmapSchema>;