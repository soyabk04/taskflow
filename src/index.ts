import express  from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import { errorMiddleware } from "./errors/error.middleware.js";

const app=express()
app.use(cookieParser());
app.use(express.json())

app.use('/auth',userRouter)
app.use(errorMiddleware)

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})