/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateAdminId, generateFacultyId, generateStudentId } from './user.utils';
import httpStatus from 'http-status'
import { TFaculty } from '../faculty/faculty.interface'

import { Admin } from '../admin/admin.model'
import { Faculty } from '../faculty/faculty.model'
import { AcademicDepartment } from '../academicDepertment/academicDepartment.model'
import AppError from '../../errors/appError'
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary'


const createStudentIntoDB = async ( file:any, password: string, payload: TStudent) => {
  // create  student role
  const userData : Partial<TUser> = {}

  // if is not given password , use default password
  userData.password = password || (config.default_pass as string)

  // set user role 
  userData.role = 'student'



  // find academic semester info 
  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)

  const session = await mongoose.startSession()

try{
  session.startTransaction()
  
  // set manually generated id 
  userData.id = await generateStudentId(admissionSemester)


  const imageName= `${userData.id}${payload?.name?.firstName}`
  const path = file?.path
    // image upload to cloudinary 
    const { secure_url } = await sendImageToCloudinary(imageName, path )


  // create a user (transaction)
  const newUser = await User.create([userData],{session})

  // create a student 
  if(!newUser.length){
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user ')

  }

    // set id , _id as user
    payload.id = newUser[0].id; // embeded id
    payload.user = newUser[0]._id // reference _id
  payload.profileImage = secure_url

      // create a user (transaction2)

  const newStudent = await Student.create([payload],{session})
  if(!newStudent.length){
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student ')

  }

  await session.commitTransaction()
  await session.endSession()

  return newStudent


}catch(err){
  await session.abortTransaction();
    await session.endSession();
    console.error("Transaction failed:", err);
    throw err;  // Rethrow or handle the error appropriately.
}
}

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_pass as string);
  userData.role = 'admin';

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    userData.id = await generateAdminId();
    console.log("Generated Admin ID:", userData.id);

    const newUser = await User.create([userData], { session });
    console.log("New User created:", newUser);

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    console.log("Admin payload:", payload);

    const newAdmin = await Admin.create([payload], { session });
    console.log("New Admin created:", newAdmin);

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();
    return newAdmin;
  } catch (err:any) {
    console.error("Error during admin creation:", err);
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};



export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB
}
