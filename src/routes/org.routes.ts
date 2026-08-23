import { Router } from "express";
import { asyncHandler } from "../utils/asynchandler.js";
import { addMemberController, createOrgController } from "../controllers/org.controller.js";
import { authMiddleware } from "../middlewares/authentication.middleware.js";

const orgRouter=Router();

orgRouter.post(
    '/create',
    authMiddleware,
    asyncHandler(createOrgController)
)
orgRouter.post(
    '/addmember',
    authMiddleware,
    asyncHandler(addMemberController)
)
export default orgRouter