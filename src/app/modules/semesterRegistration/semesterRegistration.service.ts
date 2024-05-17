import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TSemesterRegistration } from './semesterRegistration.interface'
import { SemesterRegistration } from './semesterRegistration.model'
import QueryBuilder from '../../builder/QueryBuilder'

const createSemesterRegistrationIntroDB = async (
  payload: TSemesterRegistration,
) => {
  // check if the semester is exists
  const academicSemester = payload.academicSemester
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester)
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not found !',
    )
  }

  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  })

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This semester is already exists !',
    )
  }
  const result = await SemesterRegistration.create(payload)
  return result
}
const getAllSemesterRegistrationFromDB = async (query: Record<string, unknown >) => {

  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  ).filter().sort().paginate().fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
}
const getSingleSemesterRegistrationFromDB = async (id:string) => {
    const result = await SemesterRegistration.findById(id)
    return result;
}

const deleteSemesterRegistrationIntoDB = async () => {}

const updateSemesterRegistrationIntoDB = async (id:string,payload: Partial<TSemesterRegistration>) => {
    const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
    if(!isSemesterRegistrationExists){
        throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found')
    }

    const currentSemesterStatus = isSemesterRegistrationExists.status

    if(currentSemesterStatus === 'ENDED'){
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `This semester is already ${currentSemesterStatus}`
        )
    }


    const result = await SemesterRegistration.findById(id,payload )
    return result;
}

export const semesterRegistrationServices = {
  createSemesterRegistrationIntroDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  deleteSemesterRegistrationIntoDB,
  updateSemesterRegistrationIntoDB,
}
