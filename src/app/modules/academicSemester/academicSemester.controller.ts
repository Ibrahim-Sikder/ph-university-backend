import { academicSemesterServices } from './academicSemester.services'

import { sendResponse } from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  )

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Academic Semester Created successfully!',
    data: result,
  })
})

const getAllAcademicSemester = catchAsync(async (req, res) => {
  console.log(req.cookies)
  const result = await academicSemesterServices.getAllAcademicSemesterFromDB(
  )

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Academic Semester are retrieve successfully!',
    data: result,
  })
})

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const {semesterId} = req.params;
  const result = await academicSemesterServices.getSingleAcademicSemesterFromDB(semesterId
  )

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Single academic Semester is retrieve successfully!',
    data: result,
  })
})

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await academicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body,
  );

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Academic Semester update successfully!',
    data: result,
  })
});

export const academicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester
}
