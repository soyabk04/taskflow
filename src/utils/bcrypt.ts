import bycrpt from 'bcrypt'

export const hashPassword=async (password:string)=>{
    const hashedPassword=await bycrpt.hash(password,12);
    return hashedPassword;
}

export const comparePassword = async (hashPassword:string,password:string)=>{
    const compare=await bycrpt.compare(password,hashPassword);
    return compare;
}