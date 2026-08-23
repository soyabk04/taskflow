import { z } from "zod";
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

export const zodSchemaValidator = (
    schema: z.ZodTypeAny,
    key: string
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload = req.body[key];

            if (!payload) {
                throw new AppError(
                    `${key} is required`,
                    400,
                    "VALIDATION_ERROR"
                );
            }

            const parsed =
                typeof payload === "string"
                    ? JSON.parse(payload)
                    : payload;

            const result = schema.safeParse(parsed);

            if (!result.success) {
                throw new AppError(
                    "Validation failed",
                    400,
                    "VALIDATION_ERROR",
                    result.error.issues
                );
            }

            req.body[key] = result.data;

            next();
        } catch (error) {
            next(error);
        }
    };
};