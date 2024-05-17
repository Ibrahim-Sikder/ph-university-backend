import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { userServices } from './user.service'
import { sendResponse } from '../../utils/sendResponse'

const createStudent = catchAsync(async (req, res) => {
  console.log(req.file)
  console.log(JSON.parse(req.body.data))


  const { password, student: studentData } = req.body

  const result = await userServices.createStudentIntoDB(
    req.file,
    password, studentData)

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Student is created succesfully',
    data: result,
  })
})

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body

  const result = await userServices.createFacultyIntoDB(password, facultyData)

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  })
})

const createAdmin = catchAsync(async (req, res) => {
  console.log("Received body for admin creation:", req.body);
  const { password, admin: adminData } = req.body;

  const result = await userServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});


export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
}
