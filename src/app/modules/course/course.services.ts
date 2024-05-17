/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { CourseSearchableFields } from './course.constant'
import { TCourse, TCoursefaculty } from './course.interface'
import { Course, CourseFaculty } from './course.model'
import AppError from '../../errors/appError'
import httpStatus from 'http-status'

const createCourse = async (payload: TCourse) => {
  const result = await Course.create(payload)
  return result
}
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
  const result = await courseQuery.modelQuery
  return result
}
const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate('preRequisiteCourses')
  return result
}
const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findById(id, { isDeleted: true }, { new: true })
  return result
}
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemaining } = payload

  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    // step1: basic course info
    const updateBasiceCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemaining,
      {
        new: true,
        runValidators: true,
        session,
      },
    )

    if (!updateBasiceCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course ')
    }
    //check if there is any pre requisite course to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletePreRequisites = preRequisiteCourses
        ?.filter((el) => el.isDeleted)
        .map((el) => el.course)

      const deletedPreRequisiteCoureses = await Course.findByIdAndUpdate(id, {
        $pull: {
          preRequisiteCourses: { courses: { $in: deletePreRequisites } },
        },
      })

      if (!deletedPreRequisiteCoureses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course ')
      }

      // filter out the new course fields
      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el.course && el.isDeleted,
      )

      const newPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
        $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
      })

      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course ')
      }
    }

    await session.commitTransaction()
    await session.endSession()
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course ')
  }

  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  )

  return result
}

const assingFacultiesWithCourseIntoDB = async (id: string, payload:Partial<TCoursefaculty> ) => {
  const result = await CourseFaculty.findByIdAndUpdate(id,{
    $addToSet:{faculties:{$each:payload }}
  },{
    upsert:true,
  })
}
const removeFacultiesFromCourseDB = async (id: string, payload:Partial<TCoursefaculty> ) => {
  const result = await CourseFaculty.findByIdAndUpdate(id,{
    $pull:{faculties:{$in:payload}}
  },{
  })
}

export const CourseServices = {
  createCourse,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
  assingFacultiesWithCourseIntoDB,
  removeFacultiesFromCourseDB
}
