import { z } from "zod";
import { zodSchemaValidator } from "../utils/validator.js";

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Project name is required")
    .max(100, "Project name is too long"),

  description: z
    .string()
    .trim()
    .max(500, "Description is too long")
    .optional()
});

export const updateProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Project name cannot be empty")
    .max(100, "Project name is too long")
    .optional(),

  description: z
    .string()
    .trim()
    .max(500, "Description is too long")
    .optional()
});
const createProjectSchemaValidator=zodSchemaValidator(createProjectSchema,'project')
const updateProjectSchemaValidator=zodSchemaValidator(updateProjectSchema,'project')