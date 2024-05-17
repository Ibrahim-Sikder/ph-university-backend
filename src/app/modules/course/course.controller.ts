import httpStatus from 'http-status'
import { CourseServices } from './course.services'
import { sendResponse } from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourse(req.body)

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Course is created successfully',
    data: result,
  })
})
const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseFromDB(req.query)

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Course is retrieve successfully',
    data: result,
  })
})
const getSingleCourses = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CourseServices.getSingleCourseFromDB(id)

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Single Course is retrieve successfully',
    data: result,
  })
})

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CourseServices.deleteCourseFromDB(id)

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Single Course is retrieve successfully',
    data: result,
  })
})

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CourseServices.updateCourseIntoDB(id, req.body)

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Course update successfully',
    data: result,
  })
})

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const faculties = req.body;
  const result = await CourseServices.assingFacultiesWithCourseIntoDB(courseId,faculties)

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Single Course is retrieve successfully',
    data: result,
  })
})

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const faculties = req.body;
  const result = await CourseServices.removeFacultiesFromCourseDB(courseId,faculties)

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Faculties remove successfully',
    data: result,
  })
})

export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourses,
  deleteCourse,
  updateCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
}
