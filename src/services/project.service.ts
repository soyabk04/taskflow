import { prisma } from "../libs/prisma.js";
import { AppError } from "../errors/AppError.js";

interface ProjectData {
  name: string;
  description?: string;
}

interface UpdateProjectData {
  name?: string;
  description?: string;
}


export const createProject = async (
  userId: string,
  data: ProjectData,
  organizationId: string
) => {
  const member = await prisma.orgMember.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId
      }
    }
  });

  if (!member) {
    throw new AppError(
      "User is not a member of this organization",
      403,
      "NOT_ORG_MEMBER"
    );
  }

  if (!data.name?.trim()) {
    throw new AppError(
      "Project name is required",
      400,
      "PROJECT_NAME_REQUIRED"
    );
  }

  const project = await prisma.project.create({
    data: {
      name: data.name.trim(),
      description: data.description?.trim() ?? null,
      organizationId
    }
  });

  return project;
};



export const getProjects = async (
  userId: string,
  organizationId: string
) => {
  const member = await prisma.orgMember.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId
      }
    }
  });

  if (!member) {
    throw new AppError(
      "User is not a member of this organization",
      403,
      "NOT_ORG_MEMBER"
    );
  }

  const projects = await prisma.project.findMany({
    where: {
      organizationId
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return projects;
};



export const getProject = async (
  userId: string,
  projectId: string,
  organizationId: string
) => {
  const member = await prisma.orgMember.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId
      }
    }
  });

  if (!member) {
    throw new AppError(
      "User is not a member of this organization",
      403,
      "NOT_ORG_MEMBER"
    );
  }

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      organizationId
    }
  });

  if (!project) {
    throw new AppError(
      "Project not found",
      404,
      "PROJECT_NOT_FOUND"
    );
  }

  return project;
};



export const updateProject = async (
  userId: string,
  projectId: string,
  data: UpdateProjectData,
  organizationId: string
) => {
  const member = await prisma.orgMember.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId
      }
    }
  });

  if (!member) {
    throw new AppError(
      "User is not a member of this organization",
      403,
      "NOT_ORG_MEMBER"
    );
  }

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      organizationId
    }
  });

  if (!project) {
    throw new AppError(
      "Project not found",
      404,
      "PROJECT_NOT_FOUND"
    );
  }

  const updatedProject = await prisma.project.update({
    where: {
      id: project.id
    },
    data: {
      ...(data.name !== undefined && {
        name: data.name.trim()
      }),

      ...(data.description !== undefined && {
        description: data.description.trim()
      })
    }
  });

  return updatedProject;
};



export const deleteProject = async (
  userId: string,
  projectId: string,
  organizationId: string
) => {
  const member = await prisma.orgMember.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId
      }
    }
  });

  if (!member) {
    throw new AppError(
      "User is not a member of this organization",
      403,
      "NOT_ORG_MEMBER"
    );
  }

  if (member.role !== "org_admin") {
    throw new AppError(
      "Only organization admins can delete projects",
      403,
      "FORBIDDEN"
    );
  }

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      organizationId
    }
  });

  if (!project) {
    throw new AppError(
      "Project not found",
      404,
      "PROJECT_NOT_FOUND"
    );
  }

  await prisma.project.delete({
    where: {
      id: project.id
    }
  });

  return true;
};