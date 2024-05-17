import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { TAcademicDepartment } from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const isDepartmentExits = await AcademicDepartment.findOne({ name: payload.name })
  if (isDepartmentExits) {
    throw new AppError(httpStatus.NOT_FOUND,'Department is already exists!')
  }
  const result = await AcademicDepartment.create(payload)
  return result
}

const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty')
  return result
}
const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findOne({ _id: id }).populate('academicFaculty')
  return result
}

const updateAcademicDepartmentFromDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )

  return result
}

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentFromDB,
}
