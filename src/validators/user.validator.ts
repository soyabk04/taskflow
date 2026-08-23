import {z} from 'zod'
import {zodSchemaValidator} from '../utils/validator.js'

const userSignupZodSchema=z.object({
    name:z.string().min(3).max(50),
    email:z.email(),
    password:z.string().min(8).max(100)
})
const userSigninZodSchema=z.object({
    email:z.email(),
    password:z.string().min(8).max(100)
})

export const userSignupSchemaValidator = zodSchemaValidator(userSignupZodSchema,'user')
export const userSigninSchemaValidator = zodSchemaValidator(userSigninZodSchema,'user')