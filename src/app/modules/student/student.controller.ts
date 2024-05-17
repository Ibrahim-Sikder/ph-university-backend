/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express'

import { sendResponse } from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { StudentServices } from './student.services'


const getAllStudent = catchAsync(async (req, res, next) => {
  console.log(req.query )

  const result = await StudentServices.getAllStudentsFromDB(req.query)

  res.status(200).json({
    success: true,
    message: 'Student are retrieve successfully!',
    data: result,
  })

})
const getSingleStudent = catchAsync(async (req, res, next) => {

  const { studentId } = req.params
  const result = await studentServices.getSingleStudentFromDB(studentId)
  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Single student is retrieve successfully!',
    data: result,
  })

})

const deleteStudent = catchAsync(async (req, res, next) => {

  const { studentId } = req.params
  const result = await studentServices.deleteStudentFromDB(studentId)
  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Student is delete successfully! ',
    data: result,
  })

})
const updateStudent = catchAsync(async (req, res, next) => {

  const { studentId } = req.params
  const {student} = req.body 
  const result = await studentServices.updateStudentIntoDB(studentId, student  )
  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Student update successfully! ',
    data: result,
  })

})

export const studentController = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent
}
