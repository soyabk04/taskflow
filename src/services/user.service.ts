import type { User, UserSignin } from "../types/user.types.js";
import { prisma } from '../libs/prisma.js'
import { AppError } from "../errors/AppError.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { tokenGenerator, verifyToken } from "../utils/tokenGenerator.js";
import { mailQueue } from "../queues/mail.queue.js";



export const userSignupService = async (data: User) => {
    const userData = data;
    const isUserExists = await prisma.user.findUnique(
        {
            where: { email: userData.email }
        }
    );
    if (isUserExists) {
        throw new AppError(
            'user already exists',
            403,
            'USER_ALREADY_EXISTS'
        );
    };
    const hashedpassword = await hashPassword(userData.password);
    userData.password = hashedpassword
    const createUser = await prisma.user.create({ data: userData })
    return createUser
}

export const userSigninService = async (data: UserSignin) => {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });
    if (!user) {
        throw new AppError(
            'invalid credentials',
            401,
            'INVALID_CREDENTIALS'
        );
    };
    const isPassWordMatch = await comparePassword(user.password, data.password)
    if (!isPassWordMatch) {
        throw new AppError(
            'invalid credentials',
            401,
            'INVALID_CREDENTIALS'
        );

    };
    const payload = { id: user.id, email: user.email };
    const { accessToken, refreshToken } = tokenGenerator(payload);
    const refreshTokenRecord = await prisma.refreshToken.create({
        data: {
            userId: user.id,
            token: refreshToken,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
    });
    return { accessToken, refreshToken }
}

export const userChangePasswordService = (data: any) => {

}
export const userRefreshTokenService = async (data: string) => {
    const isRefreshTokenExists = await prisma.refreshToken.findUnique({
        where: { token: data }
    })
    if (!isRefreshTokenExists) {
        throw new AppError(
            "Invalid refresh token",
            401,
            "INVALID_REFRESH_TOKEN"
        );
    }
    const isExpired =
        isRefreshTokenExists.expiresAt.getTime() < Date.now();

    const isRevoked =
        isRefreshTokenExists.revokedAt !== null &&
        isRefreshTokenExists.revokedAt.getTime() <= Date.now();

    if (isExpired || isRevoked) {
        throw new AppError(
            "Expired or revoked refresh token",
            401,
            "INVALID_REFRESH_TOKEN"
        );
    }
    const decoded = verifyToken(data, "RT");


    if (
        !isRefreshTokenExists ||
        typeof decoded !== "object" ||
        decoded === null ||
        !("id" in decoded) ||
        !("email" in decoded)
    ) {
        throw new AppError(
            "Invalid refresh token",
            401,
            "INVALID_REFRESH_TOKEN"
        );
    }

    const payload = {
        id: decoded.id as string,
        email: decoded.email as string
    };

    const { accessToken } = tokenGenerator(payload);

    return {
        accessToken
    };
};

export const userInfoService = (data: any) => {

}
export const myUserInfoService = (data: any) => {

}

export const logout = async (data: string) => {
  const token = await prisma.refreshToken.findUnique({
    where: {
      token: data
    }
  });

  if (!token || token.revokedAt) {
    throw new AppError(
      "Invalid refresh token",
      401,
      "INVALID_REFRESH_TOKEN"
    );
  }

  await prisma.refreshToken.update({
    where: {
      token: data
    },
    data: {
      revokedAt: new Date()
    }
  });
};

export const logoutAllDevices = async (data: string) => {
  const token = await prisma.refreshToken.findUnique({
    where: {
      token: data
    }
  });

  if (!token || token.revokedAt) {
    throw new AppError(
      "Invalid refresh token",
      401,
      "INVALID_REFRESH_TOKEN"
    );
  }

  await prisma.refreshToken.updateMany({
    where: {
      userId: token.userId
    },
    data: {
      revokedAt: new Date()
    }
  });
};
