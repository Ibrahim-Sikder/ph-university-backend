/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import express, { Application, NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'


export const notFound = ( req:Request, res:Response, next:NextFunction)=>{
    
    return res.status(httpStatus.NOT_FOUND).json({
      success:false,
      message: 'API Not Found !',
      error: ''
    })
  }