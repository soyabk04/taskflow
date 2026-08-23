import type { Response,Request } from 'express'
import {
    userSignupService,
    userSigninService,
    userInfoService,
    userChangePasswordService,
    userRefreshTokenService,
    myUserInfoService
} from '../services/user.service.js'

export const userSignupController=(req:Request,res:Response)=>{
   const {user}=req.body
   console.log(user)
   res.send({user})
}

export const userSigninController=(req:Request,res:Response)=>{
    
}

export const userInfoController=(req:Request,res:Response)=>{
    
}

export const userChangePasswordController=(req:Request,res:Response)=>{
    
}

export const userRefreshTokenController=(req:Request,res:Response)=>{
    
}

export const myuserController=(req:Request,res:Response)=>{
    
}