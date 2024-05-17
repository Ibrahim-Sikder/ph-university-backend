/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status"
import AppError from "../../errors/appError"
import { User } from "../user/user.model"
import { TLoginUser } from "./auth.interface"
import bcrypt  from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../../config";
import { createToken } from "./auth.util";
import { sendEmail } from "../../utils/sendEmail";


const loginUser = async(payload: TLoginUser )=>{
    const isUserExists = await User.findOne({id:payload?.id})

    if(!isUserExists){
        throw new AppError(httpStatus.NOT_FOUND,' this user is not found ')
    }

    const isDeleted = isUserExists?.isDeleted
    if(isDeleted){
        throw new AppError(httpStatus.FORBIDDEN,' this user is deleted ')
    }
    const userStatus = isUserExists?.status
    if(userStatus == 'blocked'){
        throw new AppError(httpStatus.FORBIDDEN,' this user is blocked ')
    }

    const isPasswordMatched = await bcrypt.compare(payload?.password, isUserExists?.password )


    // create token and sent to the client 

    const jwtPayload = {
        userId: isUserExists.id,
        role: isUserExists.role,
    }
    console.log(jwtPayload)


    // const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: 60 * 60 });


    // const refreshToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: 60 * 60 });

       const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string );

       const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expires_in as string );





    return {
        accessToken,
        refreshToken, 
        needPasswordChange: isUserExists?.needsPasswordChange
    }

    
}

const changePassword = async (userData:JwtPayload, payload:{
    oldPassword: string, newPassword: string 
} )=>{

    const isUserExists = await User.findOne(userData.id)

    if(!isUserExists){
        throw new AppError(httpStatus.NOT_FOUND,' this user is not found ')
    }

    const isDeleted = isUserExists?.isDeleted
    if(isDeleted){
        throw new AppError(httpStatus.FORBIDDEN,' this user is deleted ')
    }
    const userStatus = isUserExists?.status
    if(userStatus == 'blocked'){
        throw new AppError(httpStatus.FORBIDDEN,' this user is blocked ')
    }

    const isPasswordMatched = await bcrypt.compare(payload?.password, isUserExists?.password )


    // create token and sent to the client 

    const jwtPayload = {
        userId: isUserExists.id,
        role: isUserExists.role,
    }
    console.log(jwtPayload)


    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: 60 * 60 });



    const result = await User.findOneAndUpdate({
        id:User.userId,
        role: User.role,

    });

}

const refreshToken  = (token:string )=>{

    // const isDeleted = isUserExists?.isDeleted
    // if(isDeleted){
    //     throw new AppError(httpStatus.FORBIDDEN,' this user is deleted ')
    // }
    // const userStatus = isUserExists?.status
    // if(userStatus == 'blocked'){
    //     throw new AppError(httpStatus.FORBIDDEN,' this user is blocked ')
    // }

const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
) as JwtPayload 

const {role, userId, iat} = decoded
  


}
const forgetPassword  = (id:string )=>{


const resetUILink = `${config.reset_pass_uiLink}?id={}`
sendEmail( User.email , resetUILink)

}
const resetPassword  = ()=>{


}


export const AuthServices = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword
}