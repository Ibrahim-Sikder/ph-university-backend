import express from 'express'
import validateRequest from '../../middlwares/validateRequest'

import { EnrolledCourseValidations } from './enrollCourse.validation'
import { EnrolledCourseControllers } from './enrollCourse.controller'

const router = express.Router()

router.post(
  '/create-enrolled-course',
  // auth(USER_ROLE.student),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
)



export const EnrolledCourseRoutes = router;