import { AppError } from "../errors/AppError.js";
import { createOrg } from "../services/org.services.js";
import type { Request,Response } from "express";

export const createOrgController=async (req:Request,res:Response)=>{
    const user=req.user;
    const orgName=req.body.orgName;
    if(!user){
        throw new AppError(
            'invalid user',
            404,
            'INVALID_USER'
        )
    }
    const org=await createOrg({ id: user.id, email: user.email },orgName);
    res
    .status(200)
    .send({success:true,
        message:'organization created successfully',
        org
    })
}