import { z } from "zod";

export const TicketSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title is too long"),
  description: z.string().optional(),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export type TicketFormData = z.infer<typeof TicketSchema>;