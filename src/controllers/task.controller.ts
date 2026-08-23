import type { Request, Response } from "express";

import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
    createComment,
  getComments
} from "../services/task.service.js";

import { AppError } from "../errors/AppError.js";


// CREATE TASK
export const createTaskController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user!.id;

  const organizationId =
    req.params.organizationId as string;

  const projectId =
    req.params.projectId as string;

  if (!organizationId) {
    throw new AppError(
      "Organization ID is required",
      400,
      "ORGANIZATION_ID_REQUIRED"
    );
  }

  if (!projectId) {
    throw new AppError(
      "Project ID is required",
      400,
      "PROJECT_ID_REQUIRED"
    );
  }

  const { taskData } = req.body.task;

  const task = await createTask(
    userId,
    organizationId,
    projectId,
    taskData
  );

  return res.status(201).json({
    success: true,
    message: "Task created successfully",
    task
  });
};


// GET ALL TASKS
export const getTasksController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user!.id;

  const organizationId =
    req.params.organizationId as string;

  const projectId =
    req.params.projectId as string;

  if (!organizationId) {
    throw new AppError(
      "Organization ID is required",
      400,
      "ORGANIZATION_ID_REQUIRED"
    );
  }

  if (!projectId) {
    throw new AppError(
      "Project ID is required",
      400,
      "PROJECT_ID_REQUIRED"
    );
  }

  const tasks = await getTasks(
    userId,
    organizationId,
    projectId
  );

  return res.status(200).json({
    success: true,
    tasks
  });
};


// GET SINGLE TASK
export const getTaskController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user!.id;

  const organizationId =
    req.params.organizationId as string;

  const projectId =
    req.params.projectId as string;

  const taskId =
    req.params.taskId as string;

  if (!organizationId) {
    throw new AppError(
      "Organization ID is required",
      400,
      "ORGANIZATION_ID_REQUIRED"
    );
  }

  if (!projectId) {
    throw new AppError(
      "Project ID is required",
      400,
      "PROJECT_ID_REQUIRED"
    );
  }

  if (!taskId) {
    throw new AppError(
      "Task ID is required",
      400,
      "TASK_ID_REQUIRED"
    );
  }

  const task = await getTask(
    userId,
    organizationId,
    projectId,
    taskId
  );

  return res.status(200).json({
    success: true,
    task
  });
};


// UPDATE TASK
export const updateTaskController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user!.id;

  const organizationId =
    req.params.organizationId as string;

  const projectId =
    req.params.projectId as string;

  const taskId =
    req.params.taskId as string;

  if (!organizationId) {
    throw new AppError(
      "Organization ID is required",
      400,
      "ORGANIZATION_ID_REQUIRED"
    );
  }

  if (!projectId) {
    throw new AppError(
      "Project ID is required",
      400,
      "PROJECT_ID_REQUIRED"
    );
  }

  if (!taskId) {
    throw new AppError(
      "Task ID is required",
      400,
      "TASK_ID_REQUIRED"
    );
  }

  const { taskData } = req.body.task;

  const task = await updateTask(
    userId,
    organizationId,
    projectId,
    taskId,
    taskData
  );

  return res.status(200).json({
    success: true,
    message: "Task updated successfully",
    task
  });
};


// DELETE TASK
export const deleteTaskController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user!.id;

  const organizationId =
    req.params.organizationId as string;

  const projectId =
    req.params.projectId as string;

  const taskId =
    req.params.taskId as string;

  if (!organizationId) {
    throw new AppError(
      "Organization ID is required",
      400,
      "ORGANIZATION_ID_REQUIRED"
    );
  }

  if (!projectId) {
    throw new AppError(
      "Project ID is required",
      400,
      "PROJECT_ID_REQUIRED"
    );
  }

  if (!taskId) {
    throw new AppError(
      "Task ID is required",
      400,
      "TASK_ID_REQUIRED"
    );
  }

  await deleteTask(
    userId,
    organizationId,
    projectId,
    taskId
  );

  return res.status(200).json({
    success: true,
    message: "Task deleted successfully"
  });
};





// CREATE COMMENT
export const createCommentController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user!.id;

  const organizationId =
    req.params.organizationId as string;

  const projectId =
    req.params.projectId as string;

  const taskId =
    req.params.taskId as string;

  if (!organizationId) {
    throw new AppError(
      "Organization ID is required",
      400,
      "ORGANIZATION_ID_REQUIRED"
    );
  }

  if (!projectId) {
    throw new AppError(
      "Project ID is required",
      400,
      "PROJECT_ID_REQUIRED"
    );
  }

  if (!taskId) {
    throw new AppError(
      "Task ID is required",
      400,
      "TASK_ID_REQUIRED"
    );
  }

  const { content } = req.body.comment;

  const comment = await createComment(
    userId,
    organizationId,
    projectId,
    taskId,
    { content }
  );

  return res.status(201).json({
    success: true,
    message: "Comment created successfully",
    comment
  });
};


// GET COMMENTS
export const getCommentsController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user!.id;

  const organizationId =
    req.params.organizationId as string;

  const projectId =
    req.params.projectId as string;

  const taskId =
    req.params.taskId as string;

  if (!organizationId) {
    throw new AppError(
      "Organization ID is required",
      400,
      "ORGANIZATION_ID_REQUIRED"
    );
  }

  if (!projectId) {
    throw new AppError(
      "Project ID is required",
      400,
      "PROJECT_ID_REQUIRED"
    );
  }

  if (!taskId) {
    throw new AppError(
      "Task ID is required",
      400,
      "TASK_ID_REQUIRED"
    );
  }

  const comments = await getComments(
    userId,
    organizationId,
    projectId,
    taskId
  );

  return res.status(200).json({
    success: true,
    comments
  });
};