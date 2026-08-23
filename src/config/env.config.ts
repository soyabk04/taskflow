import dotenv from 'dotenv'
import { AppError } from '../errors/AppError.js';

dotenv.config();

function getenv(name:string){
    const value=process.env[name];
    if(!value){
        throw new AppError(`${name} is not found `,404,'ENV_NOT_FOUND');
    }
    return value;
}

export const ATJWTKEY=getenv('ATJWTKEY');
export const RTJWTKEY=getenv('RTJWTKEY');
export const DATABASE_URL=getenv('DATABASE_URL');