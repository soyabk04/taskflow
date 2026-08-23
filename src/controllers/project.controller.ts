import type { Request, Response } from "express";

import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
} from "../services/project.service.js";

import { AppError } from "../errors/AppError.js";


// CREATE PROJECT
export const createProjectController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user!.id;

  const organizationId = req.params.organizationId as string;

  if (!organizationId) {
    throw new AppError(
      "Organization ID is required",
      400,
      "ORGANIZATION_ID_REQUIRED"
    );
  }

  const { projectData } = req.body;

  const project = await createProject(
    userId,
    projectData,
    organizationId
  );

  return res.status(201).json({
    success: true,
    message: "Project created successfully",
    project
  });
};


// GET ALL PROJECTS
export const getProjectsController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user!.id;

  const organizationId = req.params.organizationId as string;

  if (!organizationId) {
    throw new AppError(
      "Organization ID is required",
      400,
      "ORGANIZATION_ID_REQUIRED"
    );
  }

  const projects = await getProjects(
    userId,
    organizationId
  );

  return res.status(200).json({
    success: true,
    projects
  });
};


// GET SINGLE PROJECT
export const getProjectController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user!.id;

  const organizationId = req.params.organizationId as string;
  const projectId = req.params.projectId as string;

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

  const project = await getProject(
    userId,
    projectId,
    organizationId
  );

  return res.status(200).json({
    success: true,
    project
  });
};


// UPDATE PROJECT
export const updateProjectController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user!.id;

  const organizationId = req.params.organizationId as string;
  const projectId = req.params.projectId as string;

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

  const { project } = req.body;

  const updatedProject = await updateProject(
    userId,
    projectId,
    project,
    organizationId
  );

  return res.status(200).json({
    success: true,
    message: "Project updated successfully",
    project: updatedProject
  });
};


// DELETE PROJECT
export const deleteProjectController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user!.id;

  const organizationId = req.params.organizationId as string;
  const projectId = req.params.projectId as string;

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

  await deleteProject(
    userId,
    projectId,
    organizationId
  );

  return res.status(200).json({
    success: true,
    message: "Project deleted successfully"
  });
};