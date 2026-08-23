import { Router } from "express";
import { userSignupSchemaValidator,userSigninSchemaValidator } from "../validators/user.validator.js";
import { userSignupController,userSigninController, userRefreshTokenController, logoutController, logoutAllDevicesController } from "../controllers/user.controller.js";
import { asyncHandler } from "../utils/asynchandler.js";
const userRouter=Router()

userRouter.post(
    '/register',
    userSignupSchemaValidator,
    asyncHandler(userSignupController)
)

userRouter.post(
    '/login',
    userSigninSchemaValidator,
    asyncHandler(userSigninController)
)
userRouter.post(
    '/refreshToken',
    asyncHandler(userRefreshTokenController)
)

userRouter.post(
    '/logout',
    asyncHandler(logoutController)
)
userRouter.post(
    '/logoutalldevices',
    asyncHandler(logoutAllDevicesController)
)
export default userRouter