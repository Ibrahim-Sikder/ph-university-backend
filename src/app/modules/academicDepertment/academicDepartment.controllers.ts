import httpStatus from "http-status"
import { sendResponse } from "../../utils/sendResponse"
import { academicDepartmentServices } from "./academicDepartment.services"
import catchAsync from "../../utils/catchAsync"

const createAcademicDepartment = catchAsync(async (req, res) => {

    const result = await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body, )
    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: ' Academic Department create successfully!',
      data: result,
    })
   
  
  })
  const getAllAcademicDepartment = catchAsync(async (req, res) => {

    const result = await academicDepartmentServices.getAllAcademicDepartmentFromDB()
    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: ' Academic Department is retrieve successfully!',
      data: result,
    })  
  })

  const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const {departmentId} = req.params
    const result = await academicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId)
    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: ' Single Academic Department is retrieve successfully!',
      data: result,
    })
   
  
  })

  const updateAcademicDepartment = catchAsync(async (req, res) => {
    const {departmentId} = req.params;
    const result = await academicDepartmentServices.updateAcademicDepartmentFromDB(departmentId, req.body);
    sendResponse(res, {
        statuscode: httpStatus.OK,
        success: true,
        message: 'Academic Department updated successfully!',
        data: result,
    });
});



export const academicDepartmentController = {
 createAcademicDepartment,
 getAllAcademicDepartment,
 getSingleAcademicDepartment,
 updateAcademicDepartment
}
