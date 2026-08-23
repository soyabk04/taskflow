import { prisma } from "../libs/prisma.js";
import { AppError } from "../errors/AppError.js";



export const createOrg = async (
  userInfo: {
  id: string;
  email: string;
},
  organizationName: string
) => {
  if (!organizationName || organizationName.trim().length === 0) {
    throw new AppError(
      "Organization name is required",
      400,
      "ORG_NAME_REQUIRED"
    );
  }
    console.log(userInfo)
  const user = await prisma.user.findUnique({
    where: {
      id: userInfo.id
    }
  });

  if (!user) {
    throw new AppError(
      "User not found",
      404,
      "USER_NOT_FOUND"
    );
  }
console.log(0)
  const result = await prisma.$transaction(async (tx) => {
    const organization = await tx.organization.create({
      data: {
        name: organizationName.trim()
      }
    });

    const membership = await tx.orgMember.create({
      data: {
        userId: user.id,
        organizationId: organization.id,
        role: "org_admin"
      }
    });

    return {
      organization,
      membership
    };
  });

  return result;
};


export const addMember = async (
  admin: {
    id: string;
    email:string;
    organizationId: string;
  },
  email: string
) => {
const Admin = await prisma.orgMember.findUnique({
  where: {
    userId_organizationId: {
      userId: admin.id,
      organizationId: admin.organizationId
    }
  }
});
    if(!Admin){
        throw new AppError(
            'user cant add member in this organization',
            401,
            'UNAUTHORIZE'
        )
    }
  // Only organization admins can add members
  if (Admin.role !== "org_admin") {
    throw new AppError(
      "Only organization admins can add members",
      403,
      "FORBIDDEN"
    );
  }

  const memberUser = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!memberUser) {
    throw new AppError(
      "User not found",
      404,
      "USER_NOT_FOUND"
    );
  }

  const existingMember = await prisma.orgMember.findUnique({
    where: {
      userId_organizationId: {
        userId: memberUser.id,
        organizationId: admin.organizationId
      }
    }
  });

  if (existingMember) {
    throw new AppError(
      "User is already a member of this organization",
      409,
      "USER_ALREADY_MEMBER"
    );
  }

  const membership = await prisma.orgMember.create({
    data: {
      userId: memberUser.id,
      organizationId: admin.organizationId,
      role: "member"
    }
  });

  return membership;
};