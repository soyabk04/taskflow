import express  from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import { errorMiddleware } from "./errors/error.middleware.js";
import orgRouter from "./routes/org.routes.js";
import taskRouter from "./routes/task.routes.js";


const app=express()
app.use(cookieParser());
app.use(express.json())

app.use('/auth',userRouter)
app.use('/organization',orgRouter)
app.use('/organizations',taskRouter)
app.use(errorMiddleware)
export default app


