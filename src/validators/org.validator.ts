import { z } from "zod";
import { zodSchemaValidator } from "../utils/validator.js";

export const createOrgSchema = z.object({
  orgName: z
    .string()
    .trim()
    .min(2, "Organization name must be at least 2 characters")
    .max(100, "Organization name is too long")
});

export const addMemberSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email")
});

export const createOrgSchemaValidator = zodSchemaValidator(createOrgSchema,'org')
export const addMemberSchemaValidator = zodSchemaValidator(addMemberSchema,'member')