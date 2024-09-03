import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").max(255, "Name must be at most 255 characters long"),
  username: z.string().min(3, "Username must be at least 3 characters long").max(255, "Username must be at most 255 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long").max(255, "Password must be at most 255 characters long"),
  role: z.enum(['ADMIN', 'TECH', 'USER']),
});

export const userUpdateSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").max(255, "Name must be at most 255 characters long").optional(),
  username: z.string().min(3, "Username must be at least 3 characters long").max(255, "Username must be at most 255 characters long").optional(),
  password: z.string().min(6, "Password must be at least 6 characters long").max(255, "Password must be at most 255 characters long").optional().or(z.literal('')),
  role: z.enum(['ADMIN', 'TECH', 'USER']).optional(),
});

export type UserInput = z.infer<typeof userSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;