import { Router } from "express";

import {
  createTaskController,
  getTasksController,
  getTaskController,
  updateTaskController,
  deleteTaskController
} from "../controllers/task.controller.js";

import {
  createCommentController,
  getCommentsController
} from "../controllers/task.controller.js";
import { createCommentSchemaValidator,createTaskSchemaValidator,updateTaskSchemaValidator } from "../validators/task.validator.js";

import { authMiddleware } from "../middlewares/authentication.middleware.js";
import { asyncHandler } from "../utils/asynchandler.js";



const taskRouter = Router();
taskRouter.post(
  "/:organizationId/projects/:projectId/tasks",
  authMiddleware,
  createTaskSchemaValidator,
  asyncHandler(createTaskController)
);

taskRouter.get(
  "/:organizationId/projects/:projectId/tasks",
  authMiddleware,
  asyncHandler(getTasksController)
);

taskRouter.get(
  "/:organizationId/projects/:projectId/tasks/:taskId",
  authMiddleware,
  asyncHandler(getTaskController)
);

taskRouter.patch(
  "/:organizationId/projects/:projectId/tasks/:taskId",
  authMiddleware,
  updateTaskSchemaValidator,
  asyncHandler(updateTaskController)
);

taskRouter.delete(
  "/:organizationId/projects/:projectId/tasks/:taskId",
  authMiddleware,
  asyncHandler(deleteTaskController)
);

taskRouter.post(
  "/:organizationId/projects/:projectId/tasks/:taskId/comments",
  authMiddleware,
  createCommentSchemaValidator,
  asyncHandler(createCommentController)
);

taskRouter.get(
  "/:organizationId/projects/:projectId/tasks/:taskId/comments",
  authMiddleware,
  asyncHandler(getCommentsController)
);

export default taskRouter;