import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { semesterRegistrationServices } from './semesterRegistration.service'
import { SemesterRegistration } from './semesterRegistration.model'
import AppError from '../../errors/appError'

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const isThereAnyUpcomingOngoingSemester =
      await SemesterRegistration.findOne({
        $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
      })

    if (isThereAnyUpcomingOngoingSemester) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `There is already a ${isThereAnyUpcomingOngoingSemester.status} register semister `,
      )
    }

    const result =
      await semesterRegistrationServices.createSemesterRegistrationIntroDB(
        req.body,
      )

    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: 'SemesterRegistration Created successfully!',
      data: result,
    })
  },
)

const getAllSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await semesterRegistrationServices.getAllSemesterRegistrationFromDB(
        req.query,
      )

    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: 'Semester Registration are retrieve successfully!',
      data: result,
    })
  },
)

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result =
      await semesterRegistrationServices.getSingleSemesterRegistrationFromDB(id)

    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: 'Semester Registration is successfully!',
      data: result,
    })
  },
)

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result =
      await semesterRegistrationServices.updateSemesterRegistrationIntoDB(
        id,
        req.body,
      )
    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: 'SemesterRegistration updated successfully!',
      data: result,
    })
  },
)

export const semesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
}
