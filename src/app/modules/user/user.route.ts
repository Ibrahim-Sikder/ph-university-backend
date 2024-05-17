import express, { NextFunction, Request, Response } from 'express'
import validateRequest from '../../middlwares/validateRequest'
import { createStudentValidationSchema } from '../student/student.validation'

import { createAdminValidationSchema } from '../admin/admin.validation'
import { UserControllers } from './user.controller'
import auth from '../../middlwares/auth'
import { upload } from '../../utils/sendImageToCloudinary'

const router = express.Router()

// router.post(
//   '/create-student', auth(USER_ROLE.student),
//   validateRequest(createStudentValidationSchema),
//   UserControllers.createStudent,
// )
router.post(
  '/create-student',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  // validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
)

router.post(
  '/create-faculty',
  UserControllers.createFaculty,
)

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
)

router.get(
  '/me',
  auth('student', 'faculty', 'admin'),
  UserControllers.createAdmin,
)

// router.post('/create-student', userControllers.createStudent)

export const userRoutes = router
