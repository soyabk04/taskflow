import { AppError } from "../errors/AppError.js";
import { createOrg,addMember } from "../services/org.services.js";
import type { Request,Response } from "express";

export const createOrgController=async (req:Request,res:Response)=>{
    const user=req.user;
    const orgName=req.body.org.orgName;
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

export const addMemberController=async (req:Request,res:Response)=>{
    const user=req.user!;
    const organizationId=req.body.organizationId;
    const emailMember=req.body.member.email

    if(!user){
        throw new AppError(
            'invalid user',
            404,
            'INVALID_USER'
        )
    }
    let admin={
        id:user.id,
        organizationId
    }

    const result=await addMember(admin,emailMember);


    res.status(200).send({
        success:true,
        message :'member added success fully',
        result:result
    })
}