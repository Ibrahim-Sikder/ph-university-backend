/* eslint-disable @typescript-eslint/no-explicit-any */
import { findLastFacultyId } from './../user/user.utils';
import { OfferedCourse } from './../offeredCourse/offeredCourse.model'
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { OfferedCourse } from '../offeredCourse/offeredCourse.model'
import { TEnrolledCourse } from './enrollCourse.interface'
import EnrolledCourse from './enrollCourse.model'
import { Student } from '../student/student.model'
import mongoose from 'mongoose';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  const { offeredCourse } = payload

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse)
  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found ')
  }
  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_GATEWAY, 'Room is full! ')
  }

  const student = await Student.findOne({ id: userId }).select('id')

  const isStudentAlradyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student?.id,
  })

  if (isStudentAlradyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'Student is already enrolled ! ')
  }

  const session = await mongoose.startSession()

  try{
    session.startTransaction()
  

  const result = await EnrolledCourse.create([{
    semesterRegistration: isOfferedCourseExists.semesterRegistration,
    academicSemester: isOfferedCourseExists.academicSemester,
    academicFaculty: isOfferedCourseExists.academicFaculty,
    academicDepartment: isOfferedCourseExists.academicDepartment,
    offeredCourse: isOfferedCourseExists.OfferedCourse,
    course: isOfferedCourseExists.course,
    student: student._id,
    faculty: isOfferedCourseExists.faculty,
  }],{
    session
  })

  if (isStudentAlradyEnrolled) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to enrolled course ! ')
  }

  const maxCapacity = isOfferedCourseExists.maxCapacity;
  await OfferedCourse.findOneAndUpdate(offeredCourse,{
    maxCapacity: maxCapacity - 1 
  })

  await session.commitTransaction();
  await session.endSession()



  return result
} catch(err:any){
  await session.abortTransaction();
  await session.endSession();
  throw new Error(err)
}


}

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
}
