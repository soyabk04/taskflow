import { Router } from "express";

import {
  createProjectController,
  getProjectsController,
  getProjectController,
  updateProjectController,
  deleteProjectController
} from "../controllers/project.controller.js";

import { authMiddleware } from "../middlewares/authentication.middleware.js";
import { asyncHandler } from "../utils/asynchandler.js";

const router = Router();

router.post(
  "/:organizationId/projects",
  authMiddleware,
  asyncHandler(createProjectController)
);

router.get(
  "/:organizationId/projects",
  authMiddleware,
  asyncHandler(getProjectsController)
);

router.get(
  "/:organizationId/projects/:projectId",
  authMiddleware,
  asyncHandler(getProjectController)
);

router.patch(
  "/:organizationId/projects/:projectId",
  authMiddleware,
  asyncHandler(updateProjectController)
);

router.delete(
  "/:organizationId/projects/:projectId",
  authMiddleware,
  asyncHandler(deleteProjectController)
);

export default router;