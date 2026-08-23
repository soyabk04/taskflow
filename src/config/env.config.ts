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
export const REDIS_URL=getenv('REDIS_URL')
export const SMTP_HOST = getenv('SMTP_HOST');
export const SMTP_PORT = getenv('SMTP_PORT');
export const SMTP_USER = getenv('SMTP_USER');
export const SMTP_PASSWORD = getenv('SMTP_PASSWORD');
export const MAIL_FROM = getenv('MAIL_FROM');