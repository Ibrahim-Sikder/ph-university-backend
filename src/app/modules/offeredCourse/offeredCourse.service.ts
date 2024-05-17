import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model'
import { TOfferedCourse } from './offeredCourse.interface'
import { OfferedCourse } from './offeredCourse.model'
import { AcademicDepartment } from '../academicDepertment/academicDepartment.model'
// import { Faculty } from '../faculty/faculty.model'
import { Course } from '../course/course.model'

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const { semesterRegistration, academicDepartment, course } = payload

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration)
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester register not found')
  }

//   const academicSemester = isSemesterRegistrationExists.academicSemester

  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment)
  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found')
  }

//   const isAcademicFacultyExists = await Faculty.findById(academicFaculty)
//   if (!isAcademicFacultyExists) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found')
//   }
  const isCourseExists = await Course.findById(course)
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found')
  }

  const result = await OfferedCourse.create({...payload})
  return result
}

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
}
