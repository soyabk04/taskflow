import { z } from "zod";
import { zodSchemaValidator } from "../utils/validator.js";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Task title is required")
    .max(200, "Task title is too long"),

  description: z
    .string()
    .trim()
    .max(1000, "Description is too long")
    .optional(),

  priority: z
    .enum(["low", "medium", "high"])
    .optional(),

  assigneeId: z
    .string()
    .uuid("Invalid assignee ID")
    .optional()
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .optional(),

  description: z
    .string()
    .trim()
    .max(1000)
    .optional(),

  status: z
    .enum(["todo", "in_progress", "done"])
    .optional(),

  priority: z
    .enum(["low", "medium", "high"])
    .optional(),

  assigneeId: z
    .string()
    .uuid()
    .nullable()
    .optional()
});

export const createCommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty")
    .max(2000, "Comment is too long")
});
export type CreateTaskData =
  z.infer<typeof createTaskSchema>;

export type UpdateTaskData =
  z.infer<typeof updateTaskSchema>;

export type CreateCommentData =
  z.infer<typeof createCommentSchema>;

export const createTaskSchemaValidator=zodSchemaValidator(createTaskSchema,'task')
export const updateTaskSchemaValidator=zodSchemaValidator(updateTaskSchema,'task')
export const createCommentSchemaValidator = zodSchemaValidator(createCommentSchema,'comment')