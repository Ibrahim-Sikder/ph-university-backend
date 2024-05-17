/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express'
const app:Application = express()
import cors from 'cors'
import { notFound } from './app/middlwares/notFoundRoute'
import router from './app/routes'
import globalErrorHandler from './app/middlwares/globalErrorHandler'
import cookieParser from 'cookie-parser'




//parsers
 app.use(express.json())
 app.use(cors({origin: ['http://localhost:3000']}))
 app.use(cookieParser())

 // application route
 app.use('/api/v1', router)
//  app.use('/api/v1/students', studentRouters)
//  app.use('/api/v1/users', userRoutes)

const test = async (req:Request, res:Response)=>{
  // Promise.reject()
}

app.get('/', test)

// not found route 
app.use(notFound)

app.use(globalErrorHandler)

export default app;