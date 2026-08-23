import { Router } from "express";
import { userSignupSchemaValidator,userSigninSchemaValidator } from "../validators/user.validator.js";
import { userSignupController,userSigninController } from "../controllers/user.controller.js";
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
    userSigninController
)

export default userRouter