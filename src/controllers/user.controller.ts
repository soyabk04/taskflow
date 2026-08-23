import type { Response, Request } from 'express'
import {
    userSignupService,
    userSigninService,
    userInfoService,
    userChangePasswordService,
    userRefreshTokenService,
    myUserInfoService,
    logout,
    logoutAllDevices
} from '../services/user.service.js'
import { AppError } from '../errors/AppError.js'

export const userSignupController = async (req: Request, res: Response) => {
    const { user } = req.body
    console.log(user)
    const createdUser = await userSignupService(user)
    res.send({
        success: true,
        message: 'usercreated successfully',
        createdUser
    })
}

export const userSigninController = async (
  req: Request,
  res: Response
) => {
  const { user } = req.body;

  const { accessToken, refreshToken } =
    await userSigninService(user);

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "lax"
    })
    .cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "lax"
    })
    .json({
      success: true,
      message: "Login successful"
    });
};

export const userInfoController = (req: Request, res: Response) => {

}

export const userChangePasswordController = (req: Request, res: Response) => {

}

export const userRefreshTokenController = async (req: Request, res: Response) => {
     const refreshToken=req.cookies.refreshToken;
     if(!refreshToken){
        throw new AppError(
            'refresh token not found',
            401,
            'UNAUTHORIZED'
        )
     }
     const accessToken=await userRefreshTokenService(refreshToken)
    res 
    .status(200)
    .cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "lax"
    })
    .json({
        success:true,
        message:'accesstoken generated successfully'
    })
}
export const logoutController =async (req:Request,res:Response)=>{
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new AppError(
        "Refresh token not found",
        401,
        "REFRESH_TOKEN_NOT_FOUND"
      );
    }

    await logout(refreshToken);

    return res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .status(200)
      .json({
        success: true,
        message: "Logout successful"
      });
}

export const logoutAllDevicesController =async (req:Request,res:Response)=>{
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new AppError(
        "Refresh token not found",
        401,
        "REFRESH_TOKEN_NOT_FOUND"
      );
    }

    await logoutAllDevices(refreshToken);

    return res
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .status(200)
      .json({
        success: true,
        message: "Logout fromm all devices successful"
      });
}

export const myuserController = (req: Request, res: Response) => {

}