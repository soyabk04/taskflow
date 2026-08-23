import { Router } from "express";
import { asyncHandler } from "../utils/asynchandler.js";
import { createOrgController } from "../controllers/org.controller.js";
import { authMiddleware } from "../middlewares/authentication.middleware.js";

const orgRouter=Router();

orgRouter.post(
    '/create',
    authMiddleware,
    asyncHandler(createOrgController)
)

export default orgRouter