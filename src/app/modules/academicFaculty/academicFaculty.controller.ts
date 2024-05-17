import httpStatus from 'http-status'
import { sendResponse } from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import { academicFacultyServices } from './academicFaculty.services'

const createAcademicFaculty = catchAsync(async (req, res) => {

    const result = await academicFacultyServices.createAcademicFacultyIntoDB(req.body, )
    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: ' AcademicFaculty create successfully!',
      data: result,
    })
   
  
  })
  const getAllAcademicFaculty = catchAsync(async (req, res) => {

    const result = await academicFacultyServices.getAllAcademicFacultyFromDB()
    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: ' AcademicFaculty is retrieve successfully!',
      data: result,
    })  
  })

  const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const {facultyId} = req.params
    const result = await academicFacultyServices.getSingleAcademicFacultyFromDB(facultyId)
    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: ' Single AcademicFaculty is retrieve successfully!',
      data: result,
    })
   
  
  })

  const updateAcademicFaculty = catchAsync(async (req, res) => {
    const {facultyId} = req.params;
    const result = await academicFacultyServices.updateAcademicFacultyFromDB(facultyId, req.body);
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'AcademicFaculty updated successfully!',
        data: result,
    });
});



export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty
}
