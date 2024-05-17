import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { EnrolledCourseServices } from "./enrollCourse.service";

const createEnrolledCourse = catchAsync(async (req, res) => {
    const userId = req.user.userId;
    const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
      userId,
      req.body,
    );
  
    sendResponse(res, {
      statuscode: httpStatus.OK,
      success: true,
      message: 'Student is enrolled successfully',
      data: result,
    });
  });

  export const EnrolledCourseControllers = {
    createEnrolledCourse
  }