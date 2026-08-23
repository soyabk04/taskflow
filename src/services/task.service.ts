import { prisma } from "../libs/prisma.js";
import { AppError } from "../errors/AppError.js";
import { mailQueue } from "../queues/mail.queue.js";


import type {
  CreateTaskData,
  UpdateTaskData,
  CreateCommentData
} from "../validators/task.validator.js";

export const createTask = async (
  userId: string,
  organizationId: string,
  projectId: string,
  data: CreateTaskData
) => {
  // Check requester membership
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

  // Check project belongs to organization
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

  // Find assignee
  let assignee: {
    id: string;
    name: string;
    email: string;
  } | null = null;

  if (data.assigneeId) {
    const assigneeMember = await prisma.orgMember.findUnique({
      where: {
        userId_organizationId: {
          userId: data.assigneeId,
          organizationId
        }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!assigneeMember) {
      throw new AppError(
        "Assignee is not a member of this organization",
        400,
        "INVALID_ASSIGNEE"
      );
    }

    assignee = assigneeMember.user;
  }

  // Create task
  const task = await prisma.task.create({
    data: {
      title: data.title.trim(),
      description: data.description?.trim() ?? null,
      priority: data.priority ?? "medium",
      projectId,
      assigneeId: data.assigneeId ?? null
    }
  });

  // Send assignment email through BullMQ
  if (assignee) {
    await mailQueue.add("task-assigned", {
      email: assignee.email,
      name: assignee.name,
      taskId: task.id,
      taskTitle: task.title,
      projectName: project.name
    });
  }

  return task;
};

export const getTasks = async (
  userId: string,
  organizationId: string,
  projectId: string
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

  return prisma.task.findMany({
    where: {
      projectId
    },
    include: {
      assignee: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getTask = async (
  userId: string,
  organizationId: string,
  projectId: string,
  taskId: string
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

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      projectId,
      project: {
        organizationId
      }
    },
    include: {
      assignee: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });

  if (!task) {
    throw new AppError(
      "Task not found",
      404,
      "TASK_NOT_FOUND"
    );
  }

  return task;
};


export const updateTask = async (
  userId: string,
  organizationId: string,
  projectId: string,
  taskId: string,
  data: UpdateTaskData
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

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      projectId,
      project: {
        organizationId
      }
    }
  });

  if (!task) {
    throw new AppError(
      "Task not found",
      404,
      "TASK_NOT_FOUND"
    );
  }

  if (data.assigneeId) {
    const assignee = await prisma.orgMember.findUnique({
      where: {
        userId_organizationId: {
          userId: data.assigneeId,
          organizationId
        }
      }
    });

    if (!assignee) {
      throw new AppError(
        "Assignee is not a member of this organization",
        400,
        "INVALID_ASSIGNEE"
      );
    }
  }

  return prisma.task.update({
    where: {
      id: task.id
    },
    data: {
      ...(data.title !== undefined && {
        title: data.title.trim()
      }),

      ...(data.description !== undefined && {
        description: data.description.trim()
      }),

      ...(data.status !== undefined && {
        status: data.status
      }),

      ...(data.priority !== undefined && {
        priority: data.priority
      }),

      ...(data.assigneeId !== undefined && {
        assigneeId: data.assigneeId
      })
    }
  });
};

export const deleteTask = async (
  userId: string,
  organizationId: string,
  projectId: string,
  taskId: string
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
      "Only organization admins can delete tasks",
      403,
      "FORBIDDEN"
    );
  }

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      projectId,
      project: {
        organizationId
      }
    }
  });

  if (!task) {
    throw new AppError(
      "Task not found",
      404,
      "TASK_NOT_FOUND"
    );
  }

  await prisma.task.delete({
    where: {
      id: task.id
    }
  });
};


export const createComment = async (
  userId: string,
  organizationId: string,
  projectId: string,
  taskId: string,
  data: CreateCommentData
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

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      projectId,
      project: {
        organizationId
      }
    }
  });

  if (!task) {
    throw new AppError(
      "Task not found",
      404,
      "TASK_NOT_FOUND"
    );
  }

  return prisma.comment.create({
    data: {
      content: data.content.trim(),
      taskId,
      userId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });
};

export const getComments = async (
  userId: string,
  organizationId: string,
  projectId: string,
  taskId: string
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

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      projectId,
      project: {
        organizationId
      }
    }
  });

  if (!task) {
    throw new AppError(
      "Task not found",
      404,
      "TASK_NOT_FOUND"
    );
  }

  return prisma.comment.findMany({
    where: {
      taskId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: {
      createdAt: "asc"
    }
  });
};